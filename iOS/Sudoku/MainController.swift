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

        let resources = Bundle.main.resourceURL?.appendingPathComponent("www", isDirectory: true)
        let index = (resources?.appendingPathComponent("sudokusolver.html"))!

        let web = WKWebView(frame: self.view.frame)
        web.autoresizingMask = UIView.AutoresizingMask.flexibleWidth.union( UIView.AutoresizingMask.flexibleHeight);
        web.scrollView.bounces = false
        web.loadFileURL(index, allowingReadAccessTo: resources!)
        self.view.addSubview(web)
    }
}
