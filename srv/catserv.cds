using { zempcapm1.db as d} from '../db/schema';

service catser {

    entity ReadEmp as projection on d.Employee;

}