package eagle.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
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

	@RequestMapping(value = "/api/movies", method = RequestMethod.GET)
	public @ResponseBody List<Movie> getAll() {

		// Get first record in DB based on data load in resources/data.sql
		return (ArrayList<Movie>) movieRepository.findAll();
	}
	
	@RequestMapping(value = "/api/movie", method = RequestMethod.POST)
	@ResponseStatus( HttpStatus.CREATED )
	public Movie post(@RequestBody Movie movie) {

		movieRepository.save(movie);
		// Just reflect response to show post success
		return movie;
	}
}