// An HTTP trigger Azure Function that returns a SAS token for Azure Storage for the specified container.
// You can also optionally specify a particular blob name and access permissions.
// To learn more, see https://github.com/Azure-Samples/functions-dotnet-sas-token/blob/master/README.md
"use strict";
import azure from "azure-storage";

export default function generateSasToken(context, container, blobName, permissions) {
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
