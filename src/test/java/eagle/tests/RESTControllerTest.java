package eagle.tests;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.JUnitRestDocumentation;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import eagle.controller.RESTController;

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
		this.mvc.perform(get("/movie").accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andDo(document("movies"));
	}
}