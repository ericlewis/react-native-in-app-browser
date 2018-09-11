/**
 * Copyright (c) 2018-present, Matei Bogdan Radu <matei.radu.92@gmail.com>
 *
 * This source code is licensed under the MIT license found in the LICENSE
 * file in the root directory of this source tree.
 */

import SafariServices

@objc(RNInAppBrowser)
class RNInAppBrowser: NSObject {
    private let SETTING_BARTINT = "preferredBarTintColor"
    
    @objc(openInApp:settings:)
    func openInApp(url: String, settings: NSDictionary) -> Void {
        // Can be safely unwrapped as the provided url was already validated
        // on the JS side before reaching this point.
        let url = URL(string: url)!
        
        if #available(iOS 9.0, *) {
            let safariVC = SFSafariViewController(url: url)
            customize(safariView: safariVC, settings: settings)
            
            let presentedVC = RCTPresentedViewController();
            presentedVC?.present(safariVC, animated: true)
        }
        
        // Fallback to default browser.
        else {
            DispatchQueue.main.async {
                UIApplication.shared.openURL(url)
            }
        }
    }
    
    @available(iOS 9.0, *)
    private func customize(safariView: SFSafariViewController, settings: NSDictionary) -> Void {
        if #available(iOS 10.0, *) , settings.value(forKey: SETTING_BARTINT) != nil {
            let barTint = settings.value(forKey: SETTING_BARTINT) as! String
            safariView.preferredBarTintColor = UIColor(hex: barTint)
        }
    }
    
    /// See [Difference requiresMainQueueSetup and dispatch_get_main_queue?](https://stackoverflow.com/a/50775641)
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
}