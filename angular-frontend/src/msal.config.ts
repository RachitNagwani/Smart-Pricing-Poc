import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';
import { environment } from './environments/environment';

// Replace these values with your Azure AD app registration details
const tenantId = environment.TENANT_ID;
const clientId = environment.CLIENT_ID;
const isBrowser = typeof window !== 'undefined';

export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: isBrowser ? window.location.origin : '',
    postLogoutRedirectUri: isBrowser ? window.location.protocol + '//' + window.location.host : '',
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level:any, message:any, containsPii:any) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

