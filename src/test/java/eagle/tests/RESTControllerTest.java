package eagle.tests;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Date;
import java.util.Optional;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.JUnitRestDocumentation;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import eagle.controller.RESTController;
import eagle.model.Movie;
import eagle.repo.MovieRepository;

/**
 * REST Controller UnitTest to verify interface functionality. It is mocked to
 * avoid authentication mechanism and server issues.
 *
 */
@RunWith(SpringRunner.class)
@WebMvcTest(RESTController.class)
@AutoConfigureRestDocs
public class RESTControllerTest {

	@InjectMocks
	public RESTController restController;
	
	@MockBean
	public MovieRepository movieRepository;

	private MockMvc mvc;

	@Autowired
	private WebApplicationContext context;
	
	@Rule
	public JUnitRestDocumentation restDocumentation = new JUnitRestDocumentation();

	@Before
	public void setUp() {
		this.mvc = MockMvcBuilders.webAppContextSetup(this.context)
				.apply(MockMvcRestDocumentation.documentationConfiguration(this.restDocumentation)) 
				.build();
	}

	@Test
	public void testGetMethod() throws Exception {
		//Mock database vals so no dependence on db for tests
		Movie movie = new Movie();
		movie.setId(1);
		movie.setPublishedDate(new Date());
		movie.setRating("A++");
		movie.setTitle("Indiana Jones");
		Optional<Movie> optMovie = Optional.of(movie);

		Mockito.when(movieRepository.findById(new Integer (1))).thenReturn(optMovie);
		
		this.mvc.perform(get("/movie").accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andDo(document("movies"));
	}
}