/**
 * Specification of ZWave JSON format.
 */

// TODO Handle bitmasks
// TODO Handle marker type, or rewrite it to something else
// TODO ValueType is used on IntegerParameter and EnumParameter, but will likely only appear in certain combinations
// TODO Handle the two todos at the bottom

/**
 * Major version of Z-WAVE JSON schema.
 */
export const JSON_VERSION = 2;

export interface ZwaveSpec {
	xmlVersion: string; // 3-part version number of XML specification
	jsonVersion: number; // Single major version number of JSON format
	classes: CommandClassDefinition[];
	// TODO basic, generic and specific device types
}

export interface CommandClassDefinition {
	/**
	 * Numeric id of command class in Z-Wave packets.
	 */
	commandClass: number;

	/**
	 * Version of command class.
	 */
	version: number;

	/**
	 * Name of command class as identifier in e.g. code.
	 * Given as UpperCamelCase.
	 */
	name: string;

	/**
	 * Human-readable name of command class.
	 */
	help: string;

	/**
	 * Obsolescence status of command class.
	 */
	status: ObsolescenceStatus;

	/**
	 * List of all defined commands in this command class.
	 */
	commands: CommandDefinition[];
}

export interface CommandDefinition {
	/**
	 * Numeric id of command in Z-Wave packets.
	 */
	command: number;

	/**
	 * Name of command as identifier in e.g. code.
	 * Given as UpperCamelCase.
	 */
	name: string;

	/**
	 * Human-readable name of command.
	 */
	help: string;

	/**
	 * Obsolescence status of command.
	 */
	status: ObsolescenceStatus;

	params: Array<Parameter | ParameterGroup>;

	/**
	 * If set, indicates a mask to apply to the command byte.
	 * Also, the first parameter of each command will then be
	 * a BitfieldParameter which starts reading its data from
	 * the command byte instead of the first payload byte.
	 */
	cmdMask?: number;
}

export enum ParameterType {
	ParameterGroup = "group",
	Integer = "integer",
	Enum = "enum",
	Bitfield = "bitfield",
	EnumUnion = "enumunion",
	Text = "text",
	Blob = "blob",
	EnumArray = "enumarray",
}

/**
 * Nested set of parameters.
 *
 * Equivalent to VARIANT_GROUP in XML.
 */
export interface ParameterGroup extends ParameterBase {
	type: ParameterType.ParameterGroup;
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
	type: ParameterType;

	/**
	 * Name of field in object.
	 *
	 * Given as lowerCamelCase.
	 */
	name: string;

	/**
	 * Human-readable name of field.
	 */
	help: string;

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
	type: ParameterType.Integer;

	/**
	 * Optional dictionary of number => name mappings that can be used to
	 * show the human-readable name of a specific number.
	 */
	values?: EnumValues;

	/**
	 * Whether this number is actually a special type of number, such as a
	 * node, command class, etc.
	 */
	valueType?: ValueType;

	/**
	 * Whether this parameter is a reserved field.
	 *
	 * It should always be written as 0. It may be read as non-zero
	 * when parsing a newer version of a command.
	 */
	reserved?: boolean;
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
 * Equivalent to CONST in XML.
 */
export interface EnumParameter extends ParameterBase {
	type: ParameterType.Enum;

	/**
	 * Dictionary of number => name mappings.
	 */
	values: EnumValues;

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
	type: ParameterType.Bitfield;
	fields: BitfieldElement[];
	/**
	 * Only used when cmdMask on the Command is set.
	 * In that case, the first parameter of each command will
	 * be a BitfieldParameter, with its cmdMask set to the inverse
	 * of the command's cmdMask (e.g. 0x07 for param and 0xF8
	 * for command). First payload byte for such messages therefore starts
	 * at the command byte itself (i.e. one byte earlier than normal).
	 */
	// TODO get rid of this one
	cmdMask?: number;
}

/**
 * Equivalent to MULTI_ARRAY in XML, always 1 byte.
 */
export interface EnumUnionParameter extends ParameterBase {
	type: ParameterType.EnumUnion;
	reference: ParameterReference;
	// Either enums or valueType will be present
	enums?: {
		[enumIndex: string /* number, actually */]: EnumValues;
	};
	valueType?: ValueType;
}

/**
 * Equivalent to ARRAY and VARIANT in XML, when is_ascii === true.
 */
export interface TextParameter extends ParameterBase {
	type: ParameterType.Text;
}

/**
 * Equivalent to ARRAY and VARIANT in XML, when is_ascii === false, and encaptype is not enum-like.
 */
export interface BlobParameter extends ParameterBase {
	type: ParameterType.Blob;
	/**
	 * Number of bytes to include into this parameter that are actually already specified before this param.
	 * This is used to e.g. have an explicit length field to refer to in parameters, yet that length needs
	 * to be part of an encapsulated payload.
	 */
	includeBytesBefore?: number; // TODO Probably not the right description to use, and perhaps better to collapse the separate fields into one
	blobType?: BlobType;
}

/**
 * Array of 'enum values', e.g. a list of node numbers, list of command classes, etc.
 *
 * Equivalent to VARIANTs with an enum-like encaptype (e.g. CMD_CLASS_REF).
 */
export interface EnumArrayParameter extends ParameterBase {
	type: ParameterType.EnumArray;
	valueType: ValueType;
}

/**
 * Determine length of parameter (in bytes, except for ParameterGroup, see below).
 * Fixed length (number), rest of message or based on MoreToFollow info in ParameterGroup ("auto"),
 * or based on a value in the message payload itself.
 */
export type LengthInfo = number | "auto" | DynamicLengthInfo;

export interface LocalParameterReference {
	/**
	 * Parameter name in current context (i.e. Command or current ParameterGroup).
	 *
	 * If isParentReference field is present and true, always referes to a parameter
	 * in the Command, not the current ParameterGroup.
	 */
	name: string;

	/**
	 * Select a sub-field of the given parameter.
	 * When present, 'mask' certain bits out of the given parameter to obtain the
	 * final value to use.
	 */
	bitfield?: BitfieldReference;
}

export interface ParameterReference extends LocalParameterReference {
	isParentReference?: boolean; // True if `name` refers to a parameter name in the command, even when currently in a ParameterGroup
}

/**
 * Reference to a field within a Bitfield parameter.
 * Use either the name OR the mask+shift to obtain the final value.
 */
export interface BitfieldReference {
	/**
	 * Name of sub-parameter of Bitfield.
	 *
	 * Given as lowerCamelCase.
	 */
	name: string;

	/**
	 * Mask to apply to raw value given by (Local)ParameterReference.
	 *
	 * Do not apply mask when using the BitfieldReference's name, it
	 * will already be applied.
	 */
	mask: number;

	/**
	 * Number of bits to right-shift masked value to obtain final value.
	 *
	 * Do not apply shift when using the BitfieldReference's name, it
	 * will already be applied.
	 */
	shift: number;
}

/**
 * Length of parameter in bytes.
 * Note: for ParameterGroups, the dynamic length is given as number of
 * elements, not bytes, because the actual size of each element can
 * vary.
 */
export type DynamicLengthInfo = ParameterReference;

/**
 * Specifies enum values and their names.
 *
 * Each key is actually a number, but because of JSON representation is
 * stored as a string, the index type is a string.
 */
export interface EnumValues {
	[key: string /* number, actually */]: EnumValue;
}

export interface EnumValue {
	/**
	 * Name of enum value.
	 *
	 * Given as UpperCamelCase.
	 */
	name: string;

	/**
	 * Human-readable name of field.
	 */
	help: string;
}

/**
 * Parameters can be optional. If the parameter at `index` is masked with
 * `mask` and the result is zero, the parameter is optional.
 */
export type OptionalInfo = ParameterReference;

/**
 * Used in ParameterGroup (when length is "auto").
 * Each record will indicate whether another record is
 * expected after this one.
 * If (param[name] & mask > 0), another record will follow.
 */
export type MoreToFollowInfo = LocalParameterReference;

/**
 * One value inside a BitFieldParameter.
 */
export interface BitfieldElement {
	type: BitfieldElementType;
	name: string;
	shift: number;
	mask: number;
	values?: EnumValues; // Present if type is Enum

	/**
	 * Whether this parameter is a reserved field.
	 *
	 * It should always be written as 0. It may be read as non-zero
	 * when parsing a newer version of a command.
	 */
	reserved?: boolean;
}

/**
 * When a byte is split into pieces, each piece
 * can be a boolean, an integer, or an enum.
 */
export enum BitfieldElementType {
	/**
	 * True or false.
	 */
	Boolean = "boolean",

	/**
	 * Any value within the range of its mask.
	 */
	Integer = "integer",

	/**
	 * A value in a specific set of possible values,
	 * as given by `BitfieldElement.values`.
	 */
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
	BasicDevice = "BAS_DEV_REF",
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
export enum ObsolescenceStatus {
	Active = "active",
	Obsolete = "obsolete",
	Deprecated = "deprecated",
}

export const OBSOLESCENCE_STATUS_TO_STRING = {
	[ObsolescenceStatus.Active]: "Active",
	[ObsolescenceStatus.Obsolete]: "Obsolete",
	[ObsolescenceStatus.Deprecated]: "Deprecated",
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
