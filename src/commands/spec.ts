/**
 * Helpers for reading JSON definition and parsing it
 * into an somewhat easier runtime representation.
 */

export type CommandClassNumber = number;
export type CommandClassVersionNumber = number;
export type CommandNumber = number;

export type CommandsByClassByVersion = Map<
	CommandClassNumber,
	Map<CommandClassVersionNumber, CommandClassDefinition>
>;

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

	/**
	 * Map of command number to command definition.
	 */
	commandsById: Map<number, CommandDefinition>;
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

	/**
	 * List of parameters in order of appearance in Z-Wave packet.
	 */
	params: Array<Parameter>;

	/**
	 * Mapping of parameter name to its definition.
	 * Parameter name is given in dotted notation, e.g. "myGroup.myParam",
	 * if "myParam" is a parameter inside a group.
	 * Because (bitfield) fields are extracted out of their parameter, they
	 * are not encoded with a dot, e.g. "controller" (instead of "properties1.controller"),
	 * unless they are located in a group ("myGroup.controller").
	 */
	//paramsByName: Map<string, Parameter2>;

	/**
	 * If set, indicates a mask to apply to the command byte.
	 * Also, the first parameter of each command will then be
	 * a BitfieldParameter which starts reading its data from
	 * the command byte instead of the first payload byte.
	 */
	cmdMask?: number;
}

/**
 * Types used in both JSON as well as in-memory representation of Z-Wave spec.
 */

export enum RefMode {
	Json,
	Direct,
}

/**
 * Parameter or bitfield reference as encoded in JSON file.
 */
export interface Ref {
	ref: string;
}

export interface Refs {
	refs: string[];
}

/**
 * Dynamic 'real' or 'string-based' reference type, depending
 * on whether the type hierarchy is intended to be used for
 * JSON storage, or in-memory representation.
 *
 * If Mode is RefMode.Json, the reference is an object containing a
 * string-based reference.
 * If Mode is RefMode.Direct, the reference will be the value itself.
 */
export type Reference<
	Mode extends RefMode,
	T extends Parameter<Mode> | BitfieldElement<Mode>
> = Mode extends RefMode.Json ? Ref : T;

export type References<
	Mode extends RefMode,
	T extends Parameter<Mode> | BitfieldElement<Mode>
> = Mode extends RefMode.Json ? Refs : T[];

export type Parameter<Mode extends RefMode = RefMode.Direct> =
	| LocalParameter<Mode>
	| ParameterGroup<Mode>;

export type LocalParameter<Mode extends RefMode = RefMode.Direct> =
	| IntegerParameter<Mode>
	| EnumParameter<Mode>
	| BitfieldParameter<Mode>
	| EnumUnionParameter<Mode>
	| TextParameter<Mode>
	| BlobParameter<Mode>
	| EnumArrayParameter<Mode>;

/**
 * Nested set of parameters.
 *
 * Equivalent to VARIANT_GROUP in XML.
 */
export interface ParameterGroup<Mode extends RefMode = RefMode.Direct>
	extends ParameterBase<Mode> {
	type: ParameterType.ParameterGroup;

	/**
	 * If length is "auto" either the rest of the message
	 * should be considered for the parameter group (in case
	 * moreToFollow is undefined), or the value of the moreToFollow
	 * field indicates for each record whether there will be another
	 * record.
	 */
	moreToFollow?: Reference<Mode, BitfieldElement<Mode>>;

	/**
	 * List of parameters in order of appearance in Z-Wave packet.
	 */
	params: LocalParameter<Mode>[];
}

export interface ParameterBase<Mode extends RefMode = RefMode.Direct> {
	type: ParameterType;

	/**
	 * Name of parameter in object.
	 *
	 * Given as lowerCamelCase.
	 */
	name: string;

	/**
	 * Human-readable name of parameter.
	 */
	help: string;

	/**
	 * Length of this parameter.
	 * Some fields have a fixed length (e.g. a BYTE has length 1), some
	 * are determined by the contents of another parameter, and some span until
	 * the end of the packet ("auto").
	 *
	 * @see LengthInfo for more details.
	 */
	length: LengthInfo<Mode>;

	/**
	 * Whether this parameter is optional, as determined by the value of
	 * a boolean bitfield (true means present), or integer bitfield or parameter
	 * (non-zero means present).
	 */
	optional?: Reference<Mode, BitfieldElement<Mode> | IntegerParameter<Mode>>;

	/**
	 * If present, points to the parameter group parameter of which this parameter
	 * is a member.
	 *
	 * Not stored in the JSON version of the spec, as it can be trivially derived.
	 */
	group?: Mode extends RefMode.Json ? undefined : ParameterGroup<Mode>;
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
export interface IntegerParameter<Mode extends RefMode = RefMode.Direct>
	extends ParameterBase<Mode> {
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

	/**
	 * When defined, indicates that this parameter encodes
	 * the length of another field, e.g. the number of elements in
	 * a parameter group, or the size of a blob.
	 *
	 * It can indicate the length of a parameter inside a parameter group,
	 * in which case the length of this parameter must be the same for all
	 * elements in the group.
	 *
	 * When defined, this field should be automatically derived while
	 * encoding, and omitted from the decoded object when decoding,
	 * unless the `isExplicit` flag is set.
	 */
	lengthOf?: References<
		Mode,
		TextParameter<Mode> | BlobParameter<Mode> | ParameterGroup<Mode>
	>;

	/**
	 * When defined, indicates that this parameter
	 * encodes whether the referenced optional parameter is present in the packet.
	 * I.e. the value of this parameter will be truthy if the referenced
	 * parameter is present.
	 *
	 * This reference will always have `isExplicit`: true, and the value cannot be
	 * automatically derived, but it should be checked that the referenced field is
	 * actually present or not as required.
	 */
	presenceOf?: References<Mode, LocalParameter<Mode> | ParameterGroup<Mode>>;

	/**
	 * Whether this parameter is auto-generated, e.g. when it records
	 * the length of another parameter or its presence.
	 *
	 * If isAutogenerated is true, the value should be omitted from
	 * end-user objects, if it is false or undefined, it should be
	 * included in end-user objects.
	 *
	 * Note: in some cases, the parameter is to be explicitly included,
	 * even though it could have been auto-generated. In these cases,
	 * this property will be false.
	 */
	isAutogenerated?: boolean;
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
export interface EnumParameter<Mode extends RefMode = RefMode.Direct>
	extends ParameterBase<Mode> {
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
export interface BitfieldParameter<Mode extends RefMode = RefMode.Direct>
	extends ParameterBase<Mode> {
	type: ParameterType.Bitfield;
	fields: BitfieldElement<Mode>[];
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
export interface EnumUnionParameter<Mode extends RefMode = RefMode.Direct>
	extends ParameterBase<Mode> {
	type: ParameterType.EnumUnion;
	reference: Reference<Mode, IntegerParameter<Mode> | BitfieldElement<Mode>>;
	// Either enums or valueType will be present
	enums?: {
		[enumIndex: number]: EnumValues;
	};
	valueType?: ValueType;
}

/**
 * Equivalent to ARRAY and VARIANT in XML, when is_ascii === true.
 */
export interface TextParameter<Mode extends RefMode = RefMode.Direct>
	extends ParameterBase<Mode> {
	type: ParameterType.Text;
}

/**
 * Equivalent to ARRAY and VARIANT in XML, when is_ascii === false, and encaptype is not enum-like.
 */
export interface BlobParameter<Mode extends RefMode = RefMode.Direct>
	extends ParameterBase<Mode> {
	type: ParameterType.Blob;
	blobType?: BlobType;
}

/**
 * Array of 'enum values', e.g. a list of node numbers, list of command classes, etc.
 *
 * Equivalent to VARIANTs with an enum-like encaptype (e.g. CMD_CLASS_REF).
 */
export interface EnumArrayParameter<Mode extends RefMode = RefMode.Direct>
	extends ParameterBase<Mode> {
	type: ParameterType.EnumArray;
	valueType: ValueType;
}

/**
 * Determine length of parameter (in bytes or number of elements).
 * Fixed length (number), or dynamically determined by packet length
 * or value of another parameter.
 */
export type LengthInfo<Mode extends RefMode = RefMode.Direct> =
	| number
	| ParamRefLengthInfo<Mode>
	| AutomaticLengthInfo
	| MoreToFollowLengthInfo;

/**
 * Length of parameter in bytes (for blob/text) or number of elements
 * (for ParamRef-based groups) based on value of another parameter/field.
 */
export interface ParamRefLengthInfo<Mode extends RefMode = RefMode.Direct> {
	lengthType: LengthType.ParameterReference;

	/**
	 * Reference to integer parameter or integer bitfield that determines length
	 * of current parameter.
	 */
	from: Reference<Mode, IntegerParameter<Mode> | BitfieldElement<Mode>>;

	/**
	 * If present, the number of bytes to add to the referenced
	 * parameter's length, to obtain value to be written to packet.
	 * Or, vice-versa, value to subtract from value read from packet
	 * to obtain length of referenced parameter.
	 */
	offset?: number;
}

/**
 * Length of parameter determined by available size in packet, possibly
 * reserving some space at the end for a number of fixed-length parameters.
 */
export interface AutomaticLengthInfo {
	lengthType: LengthType.Automatic;

	/**
	 * Number of bytes to leave at end of message, due to more elements
	 * following the current (automatic-length) parameter.
	 */
	endOffset: number;
}

/**
 * Length of parameter group based on a MoreToFollow flag in each element.
 */
export interface MoreToFollowLengthInfo {
	lengthType: LengthType.MoreToFollow;
}

/**
 * Specifies enum values and their names.
 */
export interface EnumValues {
	[key: string /* number encoded as string */]: EnumValue;
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
 * One value inside a BitFieldParameter.
 *
 */
// TODO split into int/enum/boolean
export interface BitfieldElement<Mode extends RefMode = RefMode.Direct> {
	fieldType: BitfieldElementType;
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

	/**
	 * When defined, indicates that this boolean or integer bitfield element
	 * encodes whether the referenced optional parameter is present in the packet.
	 * I.e. the value of this bitfield will be truthy if the referenced
	 * parameter is present.
	 *
	 * When defined on a boolean bitfield, this field should be automatically
	 * derived while encoding, and omitted from the decoded object when decoding,
	 * unless the `isExplicit` flag is set.
	 *
	 * When defined on an integer bitfield, this field will have `isExplicit`: true,
	 * and the value cannot be automatically derived, but it should be checked that
	 * the referenced field is actually present or not as required.
	 *
	 * Will not be defined on enum bitfields.
	 * Will never be defined when `isMoreToFollowFlag` is defined.
	 */
	presenceOf?: References<Mode, LocalParameter<Mode> | ParameterGroup<Mode>>;

	/**
	 * When defined and true, indicates that this boolean bitfield element
	 * encodes whether more elements are present after the current
	 * element in this parameter group.
	 *
	 * When defined, this field should be automatically derived while
	 * encoding, and omitted from the decoded object when decoding.
	 *
	 * Will only be defined on boolean bitfields in a parameter group.
	 * Will never be defined when `presenceOf` is defined.
	 */
	isMoreToFollowFlag?: boolean;

	/**
	 * When defined, indicates that this integer bitfield element encodes
	 * the length of another field, e.g. the number of elements in
	 * a parameter group, or the size of a blob.
	 *
	 * It can indicate the length of a parameter inside a parameter group,
	 * in which case the length of this parameter must be the same for all
	 * elements in the group.
	 *
	 * When defined, this field should be automatically derived while
	 * encoding, and omitted from the decoded object when decoding, unless
	 * the `isExplicit` flag is set.
	 *
	 * Will only be defined on integer bit fields.
	 */
	lengthOf?: References<Mode, LocalParameter<Mode> | ParameterGroup<Mode>>;

	/**
	 * Whether this field is auto-generated, e.g. when it records
	 * the length of another parameter or its presence.
	 *
	 * If isAutogenerated is true, the value should be omitted from
	 * end-user objects, if it is false or undefined, it should be
	 * included in end-user objects.
	 *
	 * Note: in some cases, the field is to be explicitly included,
	 * even though it could have been auto-generated. In these cases,
	 * this property will be false.
	 */
	isAutogenerated?: boolean;

	/**
	 * Reference to the parameter in which this bitfield is defined.
	 *
	 * Not stored in the JSON version of the spec, as it can be trivially derived.
	 */
	parent: Mode extends RefMode.Json ? void : BitfieldParameter<Mode>;
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

export enum LengthType {
	/**
	 * Length of parameter is determined by the value of another
	 * parameter or field.
	 */
	ParameterReference = "ref",

	/**
	 * Length of parameter is determined by the size of the packet,
	 * possibly leaving room for some fixed fields at the end.
	 */
	Automatic = "auto",

	/**
	 * Number of group elements is determined by MoreToFollow flag
	 * in each element.
	 *
	 * Only used for parameter group length.
	 */
	MoreToFollow = "moretofollow",
}

/**
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
