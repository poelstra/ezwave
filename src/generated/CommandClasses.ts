/* Auto-generated */
enum CommandClasses {
	COMMAND_CLASS_ALARM = 0x71,
	COMMAND_CLASS_NOTIFICATION = 0x71,
	COMMAND_CLASS_APPLICATION_STATUS = 0x22,
	COMMAND_CLASS_ASSOCIATION_COMMAND_CONFIGURATION = 0x9b,
	COMMAND_CLASS_ASSOCIATION = 0x85,
	COMMAND_CLASS_AV_CONTENT_DIRECTORY_MD = 0x95,
	COMMAND_CLASS_AV_CONTENT_SEARCH_MD = 0x97,
	COMMAND_CLASS_AV_RENDERER_STATUS = 0x96,
	COMMAND_CLASS_AV_TAGGING_MD = 0x99,
	COMMAND_CLASS_BASIC_TARIFF_INFO = 0x36,
	COMMAND_CLASS_BASIC_WINDOW_COVERING = 0x50,
	COMMAND_CLASS_BASIC = 0x20,
	COMMAND_CLASS_BATTERY = 0x80,
	COMMAND_CLASS_CHIMNEY_FAN = 0x2a,
	COMMAND_CLASS_CLIMATE_CONTROL_SCHEDULE = 0x46,
	COMMAND_CLASS_CLOCK = 0x81,
	COMMAND_CLASS_CONFIGURATION = 0x70,
	COMMAND_CLASS_CONTROLLER_REPLICATION = 0x21,
	COMMAND_CLASS_CRC_16_ENCAP = 0x56,
	COMMAND_CLASS_DCP_CONFIG = 0x3a,
	COMMAND_CLASS_DCP_MONITOR = 0x3b,
	COMMAND_CLASS_DOOR_LOCK_LOGGING = 0x4c,
	COMMAND_CLASS_DOOR_LOCK = 0x62,
	COMMAND_CLASS_ENERGY_PRODUCTION = 0x90,
	COMMAND_CLASS_FIRMWARE_UPDATE_MD = 0x7a,
	COMMAND_CLASS_GEOGRAPHIC_LOCATION = 0x8c,
	COMMAND_CLASS_GROUPING_NAME = 0x7b,
	COMMAND_CLASS_HAIL = 0x82,
	COMMAND_CLASS_HRV_CONTROL = 0x39,
	COMMAND_CLASS_HRV_STATUS = 0x37,
	COMMAND_CLASS_INDICATOR = 0x87,
	COMMAND_CLASS_IP_CONFIGURATION = 0x9a,
	COMMAND_CLASS_LANGUAGE = 0x89,
	COMMAND_CLASS_LOCK = 0x76,
	COMMAND_CLASS_MANUFACTURER_PROPRIETARY = 0x91,
	COMMAND_CLASS_MANUFACTURER_SPECIFIC = 0x72,
	COMMAND_CLASS_MARK = 0xef,
	COMMAND_CLASS_METER_PULSE = 0x35,
	COMMAND_CLASS_METER_TBL_CONFIG = 0x3c,
	COMMAND_CLASS_METER_TBL_MONITOR = 0x3d,
	COMMAND_CLASS_METER_TBL_PUSH = 0x3e,
	COMMAND_CLASS_METER = 0x32,
	COMMAND_CLASS_MTP_WINDOW_COVERING = 0x51,
	COMMAND_CLASS_MULTI_CHANNEL_ASSOCIATION = 0x8e,
	COMMAND_CLASS_MULTI_CHANNEL = 0x60,
	COMMAND_CLASS_MULTI_CMD = 0x8f,
	COMMAND_CLASS_MULTI_INSTANCE_ASSOCIATION = 0x8e,
	COMMAND_CLASS_MULTI_INSTANCE = 0x60,
	COMMAND_CLASS_NETWORK_MANAGEMENT_PROXY = 0x52,
	COMMAND_CLASS_NETWORK_MANAGEMENT_BASIC = 0x4d,
	COMMAND_CLASS_NETWORK_MANAGEMENT_INCLUSION = 0x34,
	COMMAND_CLASS_NO_OPERATION = 0x00,
	COMMAND_CLASS_NODE_NAMING = 0x77,
	COMMAND_CLASS_NON_INTEROPERABLE = 0xf0,
	COMMAND_CLASS_POWERLEVEL = 0x73,
	COMMAND_CLASS_PREPAYMENT_ENCAPSULATION = 0x41,
	COMMAND_CLASS_PREPAYMENT = 0x3f,
	COMMAND_CLASS_PROPRIETARY = 0x88,
	COMMAND_CLASS_PROTECTION = 0x75,
	COMMAND_CLASS_RATE_TBL_CONFIG = 0x48,
	COMMAND_CLASS_RATE_TBL_MONITOR = 0x49,
	COMMAND_CLASS_REMOTE_ASSOCIATION_ACTIVATE = 0x7c,
	COMMAND_CLASS_REMOTE_ASSOCIATION = 0x7d,
	COMMAND_CLASS_SCENE_ACTIVATION = 0x2b,
	COMMAND_CLASS_SCENE_ACTUATOR_CONF = 0x2c,
	COMMAND_CLASS_SCENE_CONTROLLER_CONF = 0x2d,
	COMMAND_CLASS_SCHEDULE_ENTRY_LOCK = 0x4e,
	COMMAND_CLASS_SCREEN_ATTRIBUTES = 0x93,
	COMMAND_CLASS_SCREEN_MD = 0x92,
	COMMAND_CLASS_SECURITY_PANEL_MODE = 0x24,
	COMMAND_CLASS_SECURITY_PANEL_ZONE_SENSOR = 0x2f,
	COMMAND_CLASS_SECURITY_PANEL_ZONE = 0x2e,
	COMMAND_CLASS_SECURITY = 0x98,
	COMMAND_CLASS_SENSOR_ALARM = 0x9c,
	COMMAND_CLASS_SENSOR_BINARY = 0x30,
	COMMAND_CLASS_SENSOR_CONFIGURATION = 0x9e,
	COMMAND_CLASS_SENSOR_MULTILEVEL = 0x31,
	COMMAND_CLASS_SILENCE_ALARM = 0x9d,
	COMMAND_CLASS_SIMPLE_AV_CONTROL = 0x94,
	COMMAND_CLASS_SWITCH_ALL = 0x27,
	COMMAND_CLASS_SWITCH_BINARY = 0x25,
	COMMAND_CLASS_SWITCH_MULTILEVEL = 0x26,
	COMMAND_CLASS_SWITCH_TOGGLE_BINARY = 0x28,
	COMMAND_CLASS_SWITCH_TOGGLE_MULTILEVEL = 0x29,
	COMMAND_CLASS_TARIFF_CONFIG = 0x4a,
	COMMAND_CLASS_TARIFF_TBL_MONITOR = 0x4b,
	COMMAND_CLASS_THERMOSTAT_FAN_MODE = 0x44,
	COMMAND_CLASS_THERMOSTAT_FAN_STATE = 0x45,
	COMMAND_CLASS_THERMOSTAT_HEATING = 0x38,
	COMMAND_CLASS_THERMOSTAT_MODE = 0x40,
	COMMAND_CLASS_THERMOSTAT_OPERATING_STATE = 0x42,
	COMMAND_CLASS_THERMOSTAT_SETBACK = 0x47,
	COMMAND_CLASS_THERMOSTAT_SETPOINT = 0x43,
	COMMAND_CLASS_TIME_PARAMETERS = 0x8b,
	COMMAND_CLASS_TIME = 0x8a,
	COMMAND_CLASS_TRANSPORT_SERVICE = 0x55,
	COMMAND_CLASS_USER_CODE = 0x63,
	COMMAND_CLASS_VERSION = 0x86,
	COMMAND_CLASS_WAKE_UP = 0x84,
	COMMAND_CLASS_ZENSOR_NET = 0x02,
	COMMAND_CLASS_ZIP_6LOWPAN = 0x4f,
	COMMAND_CLASS_ZIP = 0x23,
	ZWAVE_CMD_CLASS = 0x01,
	COMMAND_CLASS_APPLICATION_CAPABILITY = 0x57,
	COMMAND_CLASS_SWITCH_COLOR = 0x33,
	COMMAND_CLASS_SCHEDULE = 0x53,
	COMMAND_CLASS_NETWORK_MANAGEMENT_PRIMARY = 0x54,
	COMMAND_CLASS_ZIP_ND = 0x58,
	COMMAND_CLASS_ASSOCIATION_GRP_INFO = 0x59,
	COMMAND_CLASS_DEVICE_RESET_LOCALLY = 0x5a,
	COMMAND_CLASS_CENTRAL_SCENE = 0x5b,
	COMMAND_CLASS_IP_ASSOCIATION = 0x5c,
	COMMAND_CLASS_ANTITHEFT = 0x5d,
	COMMAND_CLASS_ZWAVEPLUS_INFO = 0x5e,
	COMMAND_CLASS_ZIP_GATEWAY = 0x5f,
	COMMAND_CLASS_ZIP_PORTAL = 0x61,
	COMMAND_CLASS_DMX = 0x65,
	COMMAND_CLASS_BARRIER_OPERATOR = 0x66,
	COMMAND_CLASS_NETWORK_MANAGEMENT_INSTALLATION_MAINTENANCE = 0x67,
	COMMAND_CLASS_ZIP_NAMING = 0x68,
	COMMAND_CLASS_MAILBOX = 0x69,
	COMMAND_CLASS_WINDOW_COVERING = 0x6a,
	COMMAND_CLASS_SECURITY_2 = 0x9f,
	COMMAND_CLASS_IRRIGATION = 0x6b,
	COMMAND_CLASS_SUPERVISION = 0x6c,
	COMMAND_CLASS_HUMIDITY_CONTROL_SETPOINT = 0x64,
	COMMAND_CLASS_HUMIDITY_CONTROL_MODE = 0x6d,
	COMMAND_CLASS_HUMIDITY_CONTROL_OPERATING_STATE = 0x6e,
	COMMAND_CLASS_ENTRY_CONTROL = 0x6f,
	COMMAND_CLASS_INCLUSION_CONTROLLER = 0x74,
	COMMAND_CLASS_NODE_PROVISIONING = 0x78,
	COMMAND_CLASS_SOUND_SWITCH = 0x79
};
export default CommandClasses;