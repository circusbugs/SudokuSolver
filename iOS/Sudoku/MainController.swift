//
//  ViewController.swift
//  Sudoku
//
//  Created by Ryan Hunt on 6/27/19.
//  Copyright © 2019 Arrowhead. All rights reserved.
//

import Foundation
import UIKit
import WebKit

class MainController: UIViewController {
    required init() {
        super.init(nibName: nil, bundle: nil)
    }
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        let web = WKWebView(frame: self.view.frame)
        web.loadHTMLString("<html><body>hello</body></html>", baseURL: nil)
        let resources = Bundle.main.resourceURL?.appendingPathComponent("www", isDirectory: true)
        let index = (resources?.appendingPathComponent("sudokusolver.html"))!
        web.loadFileURL(index, allowingReadAccessTo: resources!)
        self.view.addSubview(web)
    }


}

