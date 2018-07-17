package eagle.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * Basic data model for REST services to extend and use. Uses lombok to pump
 * easy POJOs.
 *
 */
@Data
@SuppressWarnings("unused")
public class Movie {

	private String title;
	private Date publishedDate;
	private String rating;

}