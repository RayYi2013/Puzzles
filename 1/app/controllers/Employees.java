package controllers;

/**
 * Created by ray on 2014-10-24.
 */
import com.fasterxml.jackson.databind.JsonNode;
import org.joda.time.DateTime;
import play.mvc.*;
import play.data.*;
import play.libs.Json;
import models.*;
import org.joda.*;

import java.util.List;

public class Employees extends Controller {

	static Form<Employee> employeeForm = Form.form(Employee.class); 

    public static Result list() {

        //get ball employee list
        List<Employee> list = Employee.all();
        //return json format
        return ok(Json.toJson(list));
    }

    @BodyParser.Of(BodyParser.Json.class)
	public static Result create()
    {
	JsonNode json = request().body().asJson();

		Employee e = fromRequestJson(json);
      if(e == null) {
        return badRequest("parameter is worng.");
      } else {
        return ok(Json.toJson(Employee.save(e)));
      }
    }

    public static Result detail(String id)
    {
        return ok(Json.toJson(Employee.detail(id)));
    }

    @BodyParser.Of(BodyParser.Json.class)
    public static Result update(String id)
    {
        JsonNode json = request().body().asJson();

        Employee e = fromRequestJson(json);
        if(e == null) {
            return badRequest("parameter is worng.");
        } else {
            e.id = id;
            return ok(Json.toJson(Employee.save(e)));
        }

    }

    public static Result delete(String id)
    {
        return ok(Json.toJson(Employee.delete(id)));

    }
    
    private static Employee fromRequestJson(JsonNode json)
    {
        Employee e = new Employee();
        String value = json.findPath("name").textValue();
        if(value == null) {
            return null;
        } else {
            e.name = value;
        }

        value = json.findPath("startDate").textValue();
        if(value == null) {
            return null;
        } else {
            DateTime dt = DateTime.parse(value);
            e.startDate = dt.toDate();
        }

        value = json.findPath("department").textValue();
        if(value == null) {
            return null;
        } else {
            e.department = value;
        }

        value = json.findPath("title").textValue();
        if(value == null) {
            return null;
        } else {
            e.title = value;
        }

        return e;
    }
}
