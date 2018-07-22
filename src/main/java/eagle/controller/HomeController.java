package eagle.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Basic homepage controller to render single page template for REACT application
 *
 */
@Controller
public class HomeController {
 
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String index() {
        return "index";
    }
}