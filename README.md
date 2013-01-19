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
