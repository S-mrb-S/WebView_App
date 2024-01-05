/**
 * MRB
 */
import { WebViewNoScript, WebViewScript_Intersect, WebViewScript_Mutation } from '../../../html_js';
/**
 * Manage scripts
 * @param start starter (bool)
 * @param scriptType number
 * @returns WebView script
 */
export function scripts(start: boolean, scriptType: 0 | 1 | 2 | number): string {
  if (start) {
    if (scriptType === 1) return WebViewScript_Mutation;
    else return WebViewScript_Intersect;
  }
  return WebViewNoScript;
}
