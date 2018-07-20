package eagle;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
	
	@PostConstruct
	void setUTCTimeZone() {
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }
}