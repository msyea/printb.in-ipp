# printb.in
printb.in is a node.js app pretending to be a IPP printer. We we going to use it to receive printing outputs from an archaic system and process the data in realtime. The output was for another system to digest and reporting dashboard. Alas the project got binned.

# from ipptool

{ version: '1.1',
  operation: 'get-printer-attributes',
  reqId: 85353,
  groups: 
   { operation: 
      { 'attributes-charset': 'utf-8',
        'attributes-natural-language': 'en',
        'printer-uri': 'ipp://localhost:3000/' } } }

# from apple

{ version: '2.0',
  operation: 'get-printer-attributes',
  reqId: 7,
  groups: 
   { operation: 
      { 'attributes-charset': 'utf-8',
        'attributes-natural-language': 'en-us',
        'printer-uri': 'ipp://localhost:3000/',
        'requesting-user-name': 'simon',
        'requested-attributes': [ 'device-uri',
								  'printer-info',
								  'printer-is-accepting-jobs',
								  'printer-make-and-model',
								  'printer-more-info' ] } } }

# made up response
