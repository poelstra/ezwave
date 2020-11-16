/**
 * Specification of ZWave JSON format.
 */

// TODO Handle bitmasks
// TODO Handle marker type, or rewrite it to something else
// TODO ValueType is used on IntegerParameter and EnumParameter, but will likely only appear in certain combinations

/**
 * Major version of Z-WAVE JSON schema.
 */
export const JSON_VERSION = 1;

export interface ZwaveSpec {
	xmlVersion: string; // 3-part version number of XML specification
	jsonVersion: number; // Single major version number of JSON format
	classes: CommandClass[];
	// TODO basic, generic and specific device types
}

export interface CommandClass {
	id: number;
	name: string;
	version: number;
	commands: Command[];
	status: Status;
}

export interface Command {
	id: number;
	name: string;
	status: Status;
	params: Array<Parameter | ParameterGroup>;
	/**
	 * If set, indicates a mask to apply to the command byte.
	 * Also, the first parameter of each command will then be
	 * a BitfieldParameter which starts reading its data from
	 * the command byte instead of the first payload byte.
	 */
	cmdMask?: number;
}

/**
 * Nested set of parameters.
 *
 * Equivalent to VARIANT_GROUP in XML.
 */
export interface ParameterGroup extends ParameterBase {
	type: "group";
	/**
	 * If length is "auto" either the rest of the message
	 * should be considered for the parameter group (in case
	 * moreToFollow is undefined), or the info in moreToFollow
	 * indicates for each record whether there will be another
	 * record.
	 */
	moreToFollow?: MoreToFollowInfo;
	params: Parameter[];
}

export type Parameter =
	| IntegerParameter
	| EnumParameter
	| BitfieldParameter
	| EnumUnionParameter
	| TextParameter
	| BlobParameter
	| EnumArrayParameter;

export interface ParameterBase {
	type: Parameter["type"] | ParameterGroup["type"];

	/**
	 * Name of field in 'struct'.
	 */
	name: string;

	/**
	 * Length of this field.
	 * Some fields have a fixed length (e.g. a BYTE has length 1), some
	 * are determined by the contents of another field, and some span until
	 * the end of the packet ("auto").
	 *
	 * @see LengthInfo for more details.
	 */
	length: LengthInfo;

	/**
	 * Whether this field is optional, as determined by the value of
	 * another field.
	 */
	optional?: OptionalInfo;
}

/**
 * Unsigned integer of a width given by the (always fixed) `length` attribute.
 * `length` will be 1, 2, 3 or 4.
 *
 * For some parameters, it may be that certain values have a special 'human-readable'
 * meaning (such as 0: "off/disable", 255: "on/enable"), while other values are
 * still valid. In such cases, the `values` attribute contains these values.
 *
 * @see EnumParameter for an alternative type that can only have specific numeric values
 *
 * Equivalent to BYTE, WORD, BIT_24 or DWORD in XML.
 */
export interface IntegerParameter extends ParameterBase {
	type: "integer";

	/**
	 * Optional dictionary of number => name mappings that can be used to
	 * show the human-readable name of a specific number.
	 */
	values?: KeyValues;

	/**
	 * Whether this number is actually a special type of number, such as a
	 * node, command class, etc.
	 */
	valueType?: ValueType;
}

/**
 * Numeric parameter that should match one of the values given in the `values`
 * attribute.
 *
 * Note that other values can still occur, e.g. if a later version of a command
 * class is used.
 *
 * @see IntegerParameter for values that can take any numeric value (of which some
 * can still be named)
 *
 * Equivalent to ENUM and CONST in XML.
 */
export interface EnumParameter extends ParameterBase {
	type: "enum";

	/**
	 * Dictionary of number => name mappings.
	 */
	values: KeyValues;

	/**
	 * Whether this number is actually a special type of number, such as a
	 * node, command class, etc.
	 */
	valueType?: ValueType;
}

/**
 * Single-byte value split into individual fields, e.g. a combination
 * of a few booleans, integers and/or enums.
 *
 * Equivalent to STRUCT_BYTE in XML.
 */
export interface BitfieldParameter extends ParameterBase {
	type: "bitfield";
	fields: BitfieldElement[];
	/**
	 * Only used when cmdMask on the Command is set.
	 * In that case, the first parameter of each command will
	 * be a BitfieldParameter, with its cmdMask set to the inverse
	 * of the command's cmdMask (e.g. 0x07 for param and 0xF8
	 * for command). First payload byte for such messages therefore starts
	 * at the command byte itself (i.e. one byte earlier than normal).
	 */
	cmdMask?: number;
}

/**
 * Equivalent to MULTI_ARRAY in XML, always 1 byte.
 */
export interface EnumUnionParameter extends ParameterBase {
	type: "enumunion";
	reference: ParameterReference;
	// Either enums or valueType will be present
	enums?: {
		[enumIndex: string /* number, actually */]: KeyValues;
	};
	valueType?: ValueType;
}

/**
 * Equivalent to ARRAY and VARIANT in XML, when is_ascii === true.
 */
export interface TextParameter extends ParameterBase {
	type: "text";
}

/**
 * Equivalent to ARRAY and VARIANT in XML, when is_ascii === false, and encaptype is not enum-like.
 */
export interface BlobParameter extends ParameterBase {
	type: "blob";
	/**
	 * Number of bytes to include into this parameter that are actually already specified before this param.
	 * This is used to e.g. have an explicit length field to refer to in parameters, yet that length needs
	 * to be part of an encapsulated payload.
	 */
	includeBytesBefore?: number;
	blobType?: BlobType;
}

/**
 * Array of 'enum values', e.g. a list of node numbers, list of command classes, etc.
 *
 * Equivalent to ENUM_ARRAY, and VARIANTS with an enum-like encaptype (e.g. CMD_CLASS_REF).
 */
export interface EnumArrayParameter extends ParameterBase {
	type: "enumarray";
	valueType: ValueType;
}

/**
 * Determine length of parameter (in bytes, except for ParameterGroup, see below).
 * Fixed length (number), rest of message or based on MoreToFollow info in ParameterGroup ("auto"),
 * or based on a value in the message payload itself.
 */
export type LengthInfo = number | "auto" | DynamicLengthInfo;

export interface ParameterReference {
	name: string; // Parameter name (in Command or current ParameterGroup)
	isParentReference?: boolean; // True if `name` refers to a parameter name in the command, even when currently in a ParameterGroup
}

/**
 * Length of parameter in bytes.
 * Note: for ParameterGroups, the dynamic length is given as number of
 * elements, not bytes, because the actual size of each element can
 * vary.
 */
export interface DynamicLengthInfo extends ParameterReference {
	mask: number; // Mask to apply to value at index
	shift: number; // Number of bits to right-shift masked value to obtain final length
}

/**
 * Specifies enum values and their names.
 *
 * Each key is actually a number, but because of JSON representation is
 * stored as a string, the index type is a string.
 */
export interface KeyValues {
	[key: string /* number, actually */]: string;
}

/**
 * Parameters can be optional. If the parameter at `index` is masked with
 * `mask` and the result is zero, the parameter is optional.
 */
export interface OptionalInfo extends ParameterReference {
	mask: number; // Mask to apply to index's value, if >0, param is present
}

/**
 * Used in ParameterGroup (when length is "auto").
 * Each record will indicate whether another record is
 * expected after this one.
 * If (param[name] & mask > 0), another record will follow.
 */
export interface MoreToFollowInfo {
	name: string; // Parameter name in current ParameterGroup
	mask: number; // Mask to apply to byte at index
}

/**
 * One value inside a BitFieldParameter.
 */
export interface BitfieldElement {
	type: BitfieldElementType;
	name: string;
	shift: number;
	mask: number;
	values?: KeyValues; // Present if type is Enum
}

export enum BitfieldElementType {
	Boolean = "bool",
	Integer = "int",
	Enum = "enum",
}

/**
 * Certain numeric values (or arrays of numbers) can be of a specific
 * type, such as a reference to a command.
 */
export enum ValueType {
	NodeNumber = "NODE_NUMBER",
	CommandClass = "CMD_CLASS_REF",
	Command = "CMD_REF",
	GenericDevice = "GEN_DEV_REF",
	SpecificDevice = "SPEC_DEV_REF",
}

/**
 * BlobParameters can encode other commands.
 */
export enum BlobType {
	/**
	 * Payload-portion of a command, without command class and command.
	 */
	CmdData = "CMD_DATA",
	/**
	 * Full command, including class, command and payload.
	 */
	CmdEncapsulation = "CMD_ENCAP",
}

/**
 * Command classes and commands can be active, obsolete or deprecated.
 */
export enum Status {
	Active = "active",
	Obsolete = "obsolete",
	Deprecated = "deprecated",
}

export const STATUS_REVERSED = {
	active: Status.Active,
	obsolete: Status.Obsolete,
	deprecated: Status.Deprecated,
};

// encaptype CMD_DATA and CMD_ENCAP is always a VARIANT
// CMD_DATA is ALWAYS preceded by a CMD_CLASS_REF and CMD_REF param
// There is one instance of CMD_ENCAP, which is NOT preceded by CMD_CLASS_REF or CMD_REF
// => It seems that CMD_ENCAP means one Buffer including class and cmd, and
//    CMD_DATA being just the data part. So sizechange=-2 for this seems incorrect.
// May want to just convert CMD_ENCAP to separate fields, just like CMD_DATA
// Or, because of cmd_mask and generally easier handling, convert all of them to
// CMD_ENCAP.

// All CMD_REFs are preceded by a CMD_CLASS_REF, which determines the range of valid
// values for the CMD_REF param itself. For GEN_DEV_REF and SPEC_DEV_REF, a special construct
// exists that selects the right enum.
