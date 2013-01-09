
/**
Print-Job
Validate-Job
Print-URI
Create-Job
Get-Printer-Attributes
Get-Jobs
All Operations
**/

var TAGS = {
    delimiter: {
        // 'reserved': 0x00,
        'operation-attributes-tag': 0x01,
        'job-attributes-tag': 0x02,
        'end-of-attributes-tag': 0x03,
        'printer-attributes-tag': 0x04,
        'unsupported-attributes-tag': 0x05,
        'chunking-end-of-attributes-tag': 0x0F //  reserved for future chunking-end-of-attributes-tag
        // 0x06-0x0e reserved for future delimiters
    },
    value: {
        'unsupported': 0x10,
        'default': 0x11, // reserved for future 'default'
        'unknown': 0x12,
        'no-value': 0x13,
        // 0x14-0x1F reserved for future "out-of-band" values
        // 'reserved': 0x20,
        'integer': 0x21,
        'boolean': 0x22,
        'enum': 0x23,
        // 0x24-0x2F reserved for future integer types
        'octetString': 0x30,  // with an  unspecified format
        'dateTime': 0x31,
        'resolution': 0x32,
        'rangeOfInteger': 0x33,
        'collection': 0x34,  // reserved for collection (in the future)
        'textWithLanguage': 0x35,
        'nameWithLanguage': 0x36,
        // 0x37-0x3F reserved for future octetString types
        // 'reserved': 0x40,
        'textWithoutLanguage': 0x41,
        'nameWithoutLanguage': 0x42,
        // 'reserved': 0x43,
        'keyword': 0x44,
        'uri': 0x45,
        'uriScheme': 0x46,
        'charset': 0x47,
        'naturalLanguage': 0x48,
        'mimeMediaType': 0x49 ,
        // 0x4A-0x5F reserved for future character string types
    }
}