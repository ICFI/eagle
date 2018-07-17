package eagle.controller;

import java.util.Date;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eagle.model.Movie;

/**
 * Basic REST controller to expose a restful interface to be enhanced
 *
 */
@RestController
public class RESTController {
 
    @RequestMapping(value = "/movie")
    public Movie index() {
    	
    	//Mock data
    	Movie movie = new Movie();
    	movie.setTitle("Indiana Jones");
    	movie.setPublishedDate(new Date());
    	movie.setRating("A");
    	
        return movie;
    }
}