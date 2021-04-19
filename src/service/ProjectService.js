import axios from 'axios'

const USER_REST_API_URL = 'http://localhost:8888/project/list';

const EMPLOYEE_REST_API_URL = 'http://localhost:8888/list';

class ProjectService {
    getProject() {
        return axios.get(USER_REST_API_URL);
    }
    
    //Add project
    createProject(project) {
        return axios.post(USER_REST_API_URL, project);
    }

    //Edit project
    updateProject(id){
        return axios.get(USER_REST_API_URL+'/'+ id);
    }

    //Edit project 
    editProject(project, projectId){
        return axios.put(USER_REST_API_URL + '/' + projectId, project);
    }

    //Delete project
    deleteProject(id){
        return axios.delete(USER_REST_API_URL + '/' + id);
    }
    //Get all and Pagination
    pagination(page){
        return axios.get(USER_REST_API_URL + '/pagination/'+page);
    }

    paginationPut(page){
        return axios.put(USER_REST_API_URL+'/pagination/'+page);
    }

    //Get employees of project
    getDetailsEmployee(id){
        return axios.put(USER_REST_API_URL+'/detail/'+id);
    }

    //Employee-------------------------------------

    //Get all employees
    getAllEmployee(id){
        return axios.put(EMPLOYEE_REST_API_URL+'/emp/'+id);
    }

    getAllEmp(){
        return axios.get(EMPLOYEE_REST_API_URL+'/employee');
    }

    //add or update employees
    createEmployeeInProject(employee){
        return axios.post(USER_REST_API_URL+'/employee',employee);
    }

    //delete details
    deleteDetails(project_id, employee_id){
        return axios.delete(USER_REST_API_URL+'/employee/'+project_id+'/'+employee_id);
    }

    //paginationEmployeesGet setting auto page = 1
    getPaginationEmployees(page){
        return axios.get(EMPLOYEE_REST_API_URL+'/employee/'+page);
    }
    //pagination
    putPaginationEmployee(page){
        return axios.put(EMPLOYEE_REST_API_URL+'/employee/'+page);
    }
    //Find employee by Id
    getemployeeById(id){
        return axios.get(EMPLOYEE_REST_API_URL+'/empUpdate/'+id);
    }
    //Update Employee
    updateEmployee(id, employee){
        return axios.put(EMPLOYEE_REST_API_URL+'/empUpdate/'+id, employee);
    }
    //add new employee
    addnewEmployee(employee){
        return axios.post(EMPLOYEE_REST_API_URL+'/empUpdate', employee);
    }
    //delete employee
    deleteEmployee(id){
        return axios.delete(EMPLOYEE_REST_API_URL+'/empDelete/'+id);
    }
    //find all projects that employee has joined
    findProjectByEmployeeId(id){
        return axios.put(EMPLOYEE_REST_API_URL+'/empDetail/'+id);
    }
    //search project
    searchProject(log){
        return axios.put(USER_REST_API_URL+'/searchPro/'+log);
    }
    //search employee
    searchEmployee(log){
        return axios.put(EMPLOYEE_REST_API_URL+'/searchEmp/'+log);
    }

}
export default new ProjectService();