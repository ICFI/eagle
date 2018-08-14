package eagle.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Basic homepage controller to render single page template for REACT application
 *
 */
@Controller
public class HomeController {
 
	/**
	 * Serves all requests to the homepage and subpaths for a single page web interface
	 *
	 */
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String index() {
        return "index";
    }
}