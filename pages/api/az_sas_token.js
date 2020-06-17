"use strict";
export default function az_sas_token(req, res) {
  if (req.body.container) {
    // The following values can be used for permissions:
    // "a" (Add), "r" (Read), "w" (Write), "d" (Delete), "l" (List)
    // Concatenate multiple permissions, such as "rwa" = Read, Write, Add
    const rett = generateSasToken(res, req.body.container, req.body.blobName, req.body.permissions);
    res.json(rett);
  } else {
    res.json([]);
  }
  res.end();
}

function generateSasToken(context, container, blobName, permissions) {
  var connString =
    "DefaultEndpointsProtocol=https;AccountName=grepaudio;AccountKey=FBlsD/jj3kJT8TnpJfknf4MibbS+W1ri7r7UCSoUtcTAjrnBnLOAD8HxPawTN6tMSfgyKY601rIwlRL/gx0AOA==;EndpointSuffix=core.windows.net";
  var blobService = azure.createBlobService(connString);

  // Create a SAS token that expires in an hour
  // Set start time to five minutes ago to avoid clock skew.
  var startDate = new Date();
  startDate.setMinutes(startDate.getMinutes() - 5);
  var expiryDate = new Date(startDate);
  expiryDate.setMinutes(startDate.getMinutes() + 60);

  permissions = permissions || azure.BlobUtilities.SharedAccessPermissions.READ;

  var sharedAccessPolicy = {
    AccessPolicy: {
      Permissions: permissions,
      Start: startDate,
      Expiry: expiryDate
    }
  };

  var sasToken = blobService.generateSharedAccessSignature(container, blobName, sharedAccessPolicy);

  return {
    token: sasToken,
    uri: blobService.getUrl(container, blobName, sasToken, true)
  };
}
