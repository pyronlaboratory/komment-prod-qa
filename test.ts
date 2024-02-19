import { configure } from "./config.js";
import { TokensFromRefresh } from "./model.js";
import { retrieveTokens, TokensFromStorage } from "./storage.js";
import { initiateAuth } from "./cognito-api.js";
import { setTimeoutWallClock } from "./util.js";

let schedulingRefresh: ReturnType<typeof _scheduleRefresh> | undefined =
  undefined;

/**
 * @description This is a decorator function for another function which takes any
 * number of parameters. It has two effects: If the schedulingRefresh variable hasn't
 * been defined yet (i.e., is undefined), it will call _scheduleRefresh with all its
 * parameters (supplied here) and return a Promise that will fulfill once that Finally
 * block runs (which sets schedulingRefresh to undefined). If schedulingRefresh has
 * already been defined (which means _scheduleRefresh had already completed with a
 * fulfilled or rejected promise), then this function does nothing. Returning that
 * same Promise object which may still be Pending (hence may throw if still pending
 * later).
 * 
 * @param { Parameters } args - The `args` input parameter is the parameter bundle
 * passed to the _scheduleRefresh function when invoking scheduleRefresh.
 * 
 * @returns { Promise } Based on the code provided the `scheduleRefresh` function
 * returns the `Promise` that is returned by calling `_scheduleRefresh` with the same
 * parameters. If a new refresh is already scheduled(i.e., schedulingRefresh exists),
 * it just return schedulingRefresh's promise. If there is no scheduled refresh or
 * if no refresh was scheduled (i.e., schedule refresh is undefined) the function
 * will schedule and return a promise of newly created refresh
 */
export async function scheduleRefresh(
  ...args: Parameters<typeof _scheduleRefresh>
) {
  if (!schedulingRefresh) {

/**
 * @description The provided code sets `schedulingRefresh` to `undefined` once the
 * `refresh` function has completed. It accomplishes this through using an anonymous
 * IIFE immediately called after the `finally` block begins and whose return value
 * (unit) overwrites the previously-bound function at that slot. The effect of which
 * is undefining scheduling refresh
 */
    schedulingRefresh = _scheduleRefresh(...args).finally(
      () => (schedulingRefresh = undefined)
    );
  }
  return schedulingRefresh;
}

type TokensForRefresh = Partial<
  Pick<TokensFromStorage, "refreshToken" | "expireAt" | "username">
>;

let clearScheduledRefresh: ReturnType<typeof setTimeoutWallClock> | undefined =
  undefined;

/**
 * @description This function schedules a token refresh as a new timeout function 30
 * seconds before the token's expiration time while taking jitter into account. The
 * timeout function retrieves new tokens and calls either the callback or Promise
 * callback provided and also sets up an abort event listener for handlingAbort signals
 * received while scheduling the timer. It returns a clear timer function that clears
 * all the scheduled refreshes; if there's an abort signal and refresh is cancelled
 * by it
 * 
 * @param { boolean } abort,tokensCb,isRefreshingCb - The `_scheduleRefresh()` function
 * takes an object of inputs: {abort?, tokensCb?, isRefreshingCb?} where:
 * - abort is an AbortSignal which when called triggers the abort() method on that signal.
 * - tokensCb is a callback function receiving the res: TokensFromRefresh result 
 * (see the documentation for retrieveTokens). It may be undefined but is usually set
 * by consuming applications to handle received token data.
 * - isRefreshingCb receives one parameter 'isRefreshing', this input does not affect
 * returned results but rather acts as a call back function providing notification
 * if an instance is already refreshing when the next attempt would begin. This will
 * avoid triggering simultaneous or successive attempts to do so within a narrow
 * window before an existing instance takes its turn; effectively introducing delay
 * until at least one complete instance is recorded after the prior was considered
 * complete by handling that call back as appropriate per case with no negative
 * consequences even if such notified instance fails.
 * 
 * @returns { object } Based on the given code sample. This function accepts an object
 * parameter with abort signal options and token call-backs of type function Then it
 * proceeds to retrieve tokens before deciding whether or not to refresh those tokens
 * or simply pass back a clear scheduled refresh to prevent repeated schedule operations
 * when the function has already run.
 * This is asynchronous and waits for retrieveTokens and any promises returned by any
 * of these callbacks to complete before returning a clearScheduleRefesh. The output
 * is a clearscheduled refresh promise
 * that could either be resolved if tokens are still fresh and have no need to refresh
 *   or rejected on failuer with the reason "failed to refresh".
 * In some case It returns void or no value as suggested by some comments. In this
 * function has been given some namesakes for debug purposes which simply means logging
 * but I couldn't see anywhere were this loggind activity takes places so you might
 * want to assume logging has ben commented out for simplicity
 */
async function _scheduleRefresh({
  abort,
  tokensCb,
  isRefreshingCb,
}: {
  abort?: AbortSignal;
  tokensCb?: (res: TokensFromRefresh) => void | Promise<void>;
  isRefreshingCb?: (isRefreshing: boolean) => unknown;
}) {
  const { debug } = configure();
  clearScheduledRefresh?.();
  const tokens = await retrieveTokens();
  if (abort?.aborted) return;
  // Refresh 30 seconds before expiry
  // Add some jitter, to spread scheduled refreshes might they be
  // requested multiple times (e.g. in multiple components)
  const refreshIn = Math.max(
    0,
    (tokens?.expireAt ?? new Date()).valueOf() -
      Date.now() -
      30 * 1000 -
      (Math.random() - 0.5) * 30 * 1000
  );
  if (refreshIn >= 1000) {
    debug?.(
      `Scheduling refresh of tokens in ${(refreshIn / 1000).toFixed(1)} seconds`
    );

/**
 * @description This function calls the `refreshTokens` function after a specified
 * amount of time (`refreshIn`) has passed using `setTimeoutWallClock`, with an error
 * handling mechanism that logs any errors to the debug function.
 */
    clearScheduledRefresh = setTimeoutWallClock(
      () =>
/**
 * @description This function calls a token-refreshing function asynchronously and
 * passes several event listeners as arguments to allow for proper error handling.
 * It catches and debugs potential refresh token errors.
 * 
 * @param { object } err - Here is an explanation of the `err` input parameter within
 * the function:
 * 
 * It captures and displays error messages using `debug?()` if something went wrong
 * during token refreshment (e.g., failed).
 */
        refreshTokens({ abort, tokensCb, isRefreshingCb, tokens }).catch(
          (err) => debug?.("Failed to refresh tokens:", err)
        ),
      refreshIn
    );
    abort?.addEventListener("abort", clearScheduledRefresh);
  } else {
/**
 * @description This anonymous function is a Promise that refreshes tokens. Specifically:
 * 
 * 1/ It calls the 'abort' and 'tokensCb' functions if they exist (but does not if
 * they are falsy)
 * 2/ If an error occurs during token refreshment and there is no debugging tool
 * installed ("debug"), the function displays an error message indicating "Failed to
 * refresh tokens."
 * 3/ Otherwise the function silently finishes executing
 * 
 * @param { object } err - The `err` input parameter is an error object that represents
 * any failure that may occur when refreshing tokens. It allows for error handling
 * and debugging purposes within the promise chain.
 */
    refreshTokens({ abort, tokensCb, isRefreshingCb, tokens }).catch((err) =>
      debug?.("Failed to refresh tokens:", err)
    );
  }
  return clearScheduledRefresh;
}

let refreshingTokens: ReturnType<typeof _refreshTokens> | undefined = undefined;

/**
 * @description This is a memoized version of the `refreshTokens` function that ensures
 * that only one call to `_refreshTokens` is made at any given time and caches the
 * result of that call so subsequent calls can return the cached value.
 * 
 * @param { Parameters } args - The `args` input parameter is an optional parameter
 * and is passed through to the `_refreshTokens()` function called inside of it.
 * 
 * @returns {  } This function takes no arguments but returns a promise that when
 * resolved or rejected will remove the variable "refreshingTokens". Therefore it
 * simply removes itself once its inner promise is settled. Its output is thus
 * "undefined", and it serves solely to clear a previously declared variable.
 */
export async function refreshTokens(
  ...args: Parameters<typeof _refreshTokens>
) {
  if (!refreshingTokens) {
/**
 * @description This function calls _refreshTokens with the passed arguments and sets
 * refreshingTokens to undefined when done.
 */
    refreshingTokens = _refreshTokens(...args).finally(
      () => (refreshingTokens = undefined)
    );
  }
  return refreshingTokens;
}

const invalidRefreshTokens = new Set<string>();

/**
 * @description This async function refreshes a token for a refresh token and username
 * passed as arguments to the function and stores the new token if it's successfully
 * renewed
 * 
 * @param { boolean } abort,tokensCb,isRefreshingCb,tokens - This function takes four
 * parameters: abort Signal; tokensCb which is a callback with refreshed tokens when
 * resolved and rejected ,is refreshing cb to receive a boolean stating the status
 * of if it's refreshing or not finally after it's completed., and last but not least
 * tokens. It retrieves user data from a system after it refreshes those specific
 * credentials if needed  using those tokens before finishing off by either throwing
 * or giving you what it had successfully authenticated and gotten access token to
 * so as you use that latter set of refreshed access credentials within your applications
 * 
 * @returns { Promise } The `_refreshTokens()` function accepts options including a
 * callback for handling new tokens (tokensCb), an option to signal cancellation
 * (abort), and the current tokens or refresh token to use for authentication(tokens)
 * along with callbacks that are triggered if either new credentials are obtained
 * after refreshing/not obtaining fresh credentails(isRefreshingCb).
 * 
 * _refreshTokens()` performs auth workflow to obtain a new accessToken when the old
 * one expired.
 * 
 * Return: {
 *         type: object
 * value: tokensFromRefresh includes the new credentials from an authentication
 * exchange after calling _retrieveTokens()
 */
async function _refreshTokens({
  abort,
  tokensCb,
  isRefreshingCb,
  tokens,
}: {
  abort?: AbortSignal;
  tokensCb?: (res: TokensFromRefresh) => void | Promise<void>;
  isRefreshingCb?: (isRefreshing: boolean) => unknown;
  tokens?: TokensForRefresh;
}): Promise<TokensFromRefresh> {
  isRefreshingCb?.(true);
  try {
    const { debug } = configure();
    if (!tokens) {
      tokens = await retrieveTokens();
    }
    const { refreshToken, username } = tokens ?? {};
    if (!refreshToken || !username) {
      throw new Error("Cannot refresh without refresh token and username");
    }
    if (invalidRefreshTokens.has(refreshToken)) {
      throw new Error(
        `Will not attempt refresh using token that failed previously: ${refreshToken}`
      );
    }
    debug?.("Refreshing tokens using refresh token ...");
    
/**
 * @description This initiates authentication using a refresh token to verify if the
 * refresh token is valid and then catch any errors that may occur during authentication
 * 
 * @param { object } err - The `err` input parameter is used to pass any error that
 * occurs during the authentication process to the catch block. This allows the code
 * to handle any errors that may occur during the authentication flow and take
 * appropriate action such as adding the refresh token to an invalid list.
 */
    const authResult = await initiateAuth({
      authflow: "REFRESH_TOKEN_AUTH",
      authParameters: {
        REFRESH_TOKEN: refreshToken,
      },
      abort,
    }).catch((err) => {
      invalidRefreshTokens.add(refreshToken);
      throw err;
    });
    const tokensFromRefresh: TokensFromRefresh = {
      accessToken: authResult.AuthenticationResult.AccessToken,
      idToken: authResult.AuthenticationResult.IdToken,
      expireAt: new Date(
        Date.now() + authResult.AuthenticationResult.ExpiresIn * 1000
      ),
      username,
    };
    await tokensCb?.(tokensFromRefresh);
    return tokensFromRefresh;
  } finally {
    isRefreshingCb?.(false);
  }
}
