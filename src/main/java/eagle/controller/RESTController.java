package eagle.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eagle.model.Movie;
import eagle.repo.MovieRepository;

/**
 * Basic REST controller to expose a restful interface to be enhanced
 *
 */
@RestController
public class RESTController {

	@Autowired
	MovieRepository movieRepository;

	@RequestMapping(value = "/movie")
	public Movie get() {

		// Get first record in DB based on data load in resources/data.sql
		return movieRepository.findById(new Integer(1)).get();
	}
}