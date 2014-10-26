package models;

import java.util.*;
import play.modules.mongodb.jackson.MongoDB;
import net.vz.mongodb.jackson.JacksonDBCollection;
import net.vz.mongodb.jackson.Id;
import net.vz.mongodb.jackson.ObjectId;
import org.codehaus.jackson.annotate.JsonProperty;

import javax.persistence.*;


public class Employee{
    @Id
    @ObjectId
    public String id;

    public String name;

    public String department;

    public String title;


    public Date startDate;

  private static JacksonDBCollection<Employee, String> coll = MongoDB.getCollection("employees", Employee.class, String.class);

  public Employee(){

  }

    public static List<Employee> all() {
    return Employee.coll.find().toArray();
  }

  public static Employee detail(String id) {
    return Employee.coll.findOneById(id);
  }

  public static String save(Employee e) {
    return Employee.coll.save(e).getSavedId();
  }

  
  public static String delete(String id) {
    Employee employee = Employee.coll.findOneById(id);
    if (employee != null) {
        Employee.coll.remove(employee);
        return id;
    }
	return "";
  }


}
