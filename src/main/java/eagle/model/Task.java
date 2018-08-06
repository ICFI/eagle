package eagle.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

/**
 * Basic data entity model to interact with a DB interface and to be exposed by
 * a REST services. In a project, model would be seperated based on the overall
 * domain model. Data model can be advanced as needed. Uses Lombok to pump easy
 * POJOs.
 *
 */
@Data
public class Task {

	@JsonFormat(pattern="dd-MM-yyyy", timezone="UTC")
	private Date start;
	@JsonFormat(pattern="dd-MM-yyyy", timezone="UTC")
	private Date end;

}