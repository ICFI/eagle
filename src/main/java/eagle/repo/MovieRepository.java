package eagle.repo;

import org.springframework.data.repository.CrudRepository;

import eagle.model.Movie;

/**
 * Repository for Movie database table. Auto implements all CRUD calls by Spring
 * Boot. Additional database methods can be added here.
 *
 */
public interface MovieRepository extends CrudRepository<Movie, Integer> {

}