package eagle.tests;

import static org.junit.Assert.assertEquals;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.IOException;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.restdocs.JUnitRestDocumentation;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;

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
				.apply(MockMvcRestDocumentation.documentationConfiguration(this.restDocumentation)).build();
	}

	@Test
	public void testGetAllMethod() throws Exception {
		// Mock database vals so no dependence on db for tests
		Movie movie = new Movie();
		movie.setId(new Long(1));
		movie.setPublishedDate(new Date());
		movie.setRating("A++");
		movie.setTitle("Indiana Jones");
		Optional<Movie> optMovie = Optional.of(movie);

		Mockito.when(movieRepository.findById(new Long(1))).thenReturn(optMovie);

		this.mvc.perform(get("/api/movies").accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andDo(document("movies"));
	}

	@Test
	public void testPostMethod() throws Exception {
		Movie testMovie = new Movie();
		testMovie.setId(new Long(1));
		testMovie.setTitle("testTitle");

		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/movie").accept(MediaType.APPLICATION_JSON)
				.content(convertObjectToJsonBytes(testMovie)).contentType(MediaType.APPLICATION_JSON);

		MvcResult result = this.mvc.perform(requestBuilder).andReturn();

		MockHttpServletResponse response = result.getResponse();
		
		assertEquals(HttpStatus.CREATED.value(), response.getStatus());
	}

	private static byte[] convertObjectToJsonBytes(Object object) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
		return mapper.writeValueAsBytes(object);
	}
}