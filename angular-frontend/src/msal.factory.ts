// msal.factory.ts
import { PublicClientApplication, BrowserCacheLocation, IPublicClientApplication, LogLevel, InteractionType } from '@azure/msal-browser';
import { msalConfig} from './msal.config';
import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { environment } from './environments/environment';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export function loggerCallback(logLevel: LogLevel, message: string) {
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
    return {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: [environment.AUDIANCE]
      }
    };
  }

  export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
    const protectedResourceMap = new Map<string, any>();
    protectedResourceMap.set(environment.API_ENDPOINT, ['user.read']);
  
    return {
      interactionType: InteractionType.Redirect,
      protectedResourceMap
    };
  }

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: msalConfig.auth.clientId,
      authority: msalConfig.auth.authority,
      redirectUri: msalConfig.auth.redirectUri,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE,
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}
