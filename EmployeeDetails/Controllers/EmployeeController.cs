using EmployeeDetails.DataLayer;
using EmployeeDetails.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;

namespace EmployeeDetails.Controllers
{
    public class EmployeeController : Controller
    {
        //Copany Database initialization
        private CompanyDetailsEntities db = new CompanyDetailsEntities();

        // GET: Employee
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Get Employee details
        /// </summary>
        /// <param name="jtStartIndex"></param>
        /// <param name="jtPageSize"></param>
        /// <param name="jtSorting"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult EmployeesList(int jtStartIndex, int jtPageSize, string jtSorting)
        {
            try
            {
                //Generate  query
                var query = db.Employees.Select(result => new EmployeeDetailsModel()
                {
                    Id = result.Id,
                    FirstName = result.FirstName,
                    LastName = result.LastName,
                    Code = result.Code,
                    CreatedOn = result.CreatedOn,
                    MobileNumber = result.MobileNumber,
                    Gender = result.Gender,
                    EmployeeId = result.Id.ToString()
                });
                // Get the Total page Count
                long RecordCount = query.ToList().Count;

                //Filter the data with startIndex and PageSize
                List<EmployeeDetailsModel> lstData = query
                                                    .OrderBy(l => l.FirstName)
                                                    .Skip(jtStartIndex)
                                                    .Take(jtPageSize)
                                                    .ToList();

                return Json(new { Result = "OK", Records = lstData, TotalRecordCount = RecordCount });
            }
            catch (Exception ex)
            {
                return Json(new { Error = "ERROR", Message = ex.Message });
            }
        }

        /// <summary>
        /// Delete the Employee deatils and Employee Address
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult DeleteEmployeeDetails(string employeeId)
        {
            try
            {
                Guid id = new Guid(employeeId);
                // Get the Employee details
                Employee employee = db.Employees.Find(id);

                // Get the Employee Address details
                var employeeAddress = GetEmployeeAddress(employee.Id);
                if (employeeAddress != null)
                {
                    //Verify and Remove the Employee Address
                    if (employeeAddress != null)
                    {
                        db.EmployeeAddresses.Remove(employeeAddress);
                        db.SaveChanges();
                    }

                }

                //Verify and Remove the Employee record

                if (employee != null)
                {
                    db.Employees.Remove(employee);
                    db.SaveChanges();
                    return new JsonResult() { Data = true };
                }
                else
                {
                    return new JsonResult() { Data = false };
                }
            }
            catch (Exception ex)
            {
                return new JsonResult() { Data = ex.Message };
            }
        }

        /// <summary>
        /// Edit and update the Employee details using Empoyee Id
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        public ActionResult Edit(string employeeId)
        {
            ViewBag.Page2 = "Employee Settings";
            //Validate the Model
            if (ModelState.IsValid)
            {
                //Verify the EmployeeId
                if (!string.IsNullOrEmpty(employeeId))
                {
                    //Generate New Id
                    Guid id = new Guid(employeeId);
                    //Get the Employee Id
                    Employee employeeBasicDetails = db.Employees.Find(id);
                    EmployeeDetailsModel employeeDetails = new EmployeeDetailsModel();
                    //Update the Employee Basic Details
                    if (employeeBasicDetails != null)
                    {
                        employeeDetails.Id = employeeBasicDetails.Id;
                        employeeDetails.FirstName = employeeBasicDetails.FirstName;
                        employeeDetails.LastName = employeeBasicDetails.LastName;
                        employeeDetails.Gender = employeeBasicDetails.Gender;
                        employeeDetails.MobileNumber = employeeBasicDetails.MobileNumber;
                        employeeDetails.Code = employeeBasicDetails.Code;
                        employeeDetails.CreatedOn = employeeBasicDetails.CreatedOn;

                        EmployeeAddress employeeAddress = GetEmployeeAddress(employeeBasicDetails.Id);
                        //Update the Employee Address
                        if (employeeAddress != null)
                        {
                            employeeDetails.Address1 = employeeAddress.Address1;
                            employeeDetails.Address2 = employeeAddress.Address2;
                            employeeDetails.State = employeeAddress.State;
                            employeeDetails.City = employeeAddress.City;
                            employeeDetails.Country = employeeAddress.Country;
                            employeeDetails.Pincode = employeeAddress.Pincode;
                        }
                    }

                    if (employeeDetails == null)
                    {
                        return HttpNotFound();
                    }
                    return View(employeeDetails);
                }
            }
            return HttpNotFound();
        }


        /// <summary>
        /// Get the Employee Address using Employee Id
        /// </summary>
        /// <param name="employeeId"></param>
        /// <returns></returns>
        private EmployeeAddress GetEmployeeAddress(Guid employeeId)
        {
            return db.EmployeeAddresses.Where(a => a.EmployeeId == employeeId).FirstOrDefault();
        }

        /// <summary>
        /// Create a New Model for New Employee
        /// </summary>
        /// <returns></returns>
        public ActionResult Create()
        {
            ViewBag.Page3 = "New Employee";
            return View();
        }

        /// <summary>
        /// Update the Employee Details
        /// </summary>
        /// <param name="objData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult UpdateEmployee(string objData)
        {
            try
            {
                //Validate the Model
                if (ModelState.IsValid)
                {
                    var employeeDetails = Newtonsoft.Json.JsonConvert.DeserializeObject<EmployeeDetailsModel>(objData);

                    Guid id = new Guid(employeeDetails.Id.ToString());

                    if (id != Guid.Empty)
                    {
                        //Update Employee deatils
                        Guid employeeId = SaveEmployeeDetais(employeeDetails, false);

                        if (employeeId != Guid.Empty)
                        {
                            //Update Employee Address
                            SaveEmployeeAddress(employeeDetails);
                        }

                        //Return Json result with Employee Id
                        return new JsonResult() { Data = employeeId };
                    }

                    return new JsonResult() { Data = "Invalid Data" };
                }
                else
                {
                    return new JsonResult() { Data = "No Data" };
                }
            }
            catch (Exception ex)
            {
                return new JsonResult() { Data = ex.Message };
            }

        }

        /// <summary>
        /// Save Employee details
        /// </summary>
        /// <param name="objData"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult SaveEmployee(string objData)
        {
            try
            {
                EmployeeDetailsModel employee = Newtonsoft.Json.JsonConvert.DeserializeObject<EmployeeDetailsModel>(objData);
                var EmployeeCode = db.Employees.Where(c => c.Code == employee.Code);
                //Validate the Employee Code already exist
                if (EmployeeCode.Count() == 0)
                {
                    //Save the new Record
                    Guid newEmployeeId = SaveEmployeeDetais(employee);
                    if (newEmployeeId != Guid.Empty)
                    {
                        employee.Id = newEmployeeId;
                        ViewBag.EmployeeID = newEmployeeId;
                        if (SaveEmployeeAddress(employee))
                        {
                            return new JsonResult() { Data = newEmployeeId };
                        }
                    }
                    return new JsonResult() { Data = newEmployeeId };
                }
                return new JsonResult() { Data = 0 };
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    Error = "ERROR",
                    Message = ex.Message
                });
            }

        }


        private bool SaveEmployeeAddress(EmployeeDetailsModel employee)
        {
            if (employee != null)
            {
                //Verify and validate the Employee already have Employee Address
                EmployeeAddress employeeAddress = GetEmployeeAddress(employee.Id);

                if (employeeAddress == null)
                {
                    // New Entry.. so generate New Model
                    employeeAddress = new EmployeeAddress();
                }

                //Update Employee Address
                employeeAddress.Address1 = employee.Address1;
                employeeAddress.Address2 = employee.Address2;
                employeeAddress.City = employee.City;
                employeeAddress.Country = employee.Country;
                employeeAddress.Pincode = employee.Pincode;
                employeeAddress.State = employee.State;

                //Validate the employee details
                if (employeeAddress != null)
                {
                    employeeAddress.EmployeeId = employee.Id;

                    // Update Employee Address
                    if (employeeAddress.Id > 0)
                    {
                        db.Entry(employeeAddress).State = EntityState.Modified;
                    }
                    else
                    {
                        // Add New Record
                        db.EmployeeAddresses.Add(employeeAddress);
                    }
                    db.SaveChanges();

                    return true;
                }
            }
            return false;
        }

        private Guid SaveEmployeeDetais(EmployeeDetailsModel employee, bool isNew = true)
        {
            //Validate the Model
            if (employee != null)
            {
                //Get Employee details
                Employee dataEmployee = db.Employees.Find(employee.Id);
                if (dataEmployee == null)
                {
                    //New Employee
                    dataEmployee = new Employee();
                    dataEmployee.Id = new Guid();
                    dataEmployee.CreatedOn = DateTime.UtcNow;
                }

                if (dataEmployee != null)
                {
                    //Update Values
                    dataEmployee.FirstName = employee.FirstName;
                    dataEmployee.LastName = employee.LastName;
                    dataEmployee.Gender = employee.Gender;
                    dataEmployee.Code = employee.Code;
                    dataEmployee.MobileNumber = employee.MobileNumber;
                }

                //Save Data
                // Update Employee Address
                if (!isNew)
                {
                    dataEmployee.Id = employee.Id;
                    db.Entry(dataEmployee).State = EntityState.Modified;
                }
                else
                {
                    // Add New Record
                    db.Employees.Add(dataEmployee);
                }

                db.SaveChanges();

                return dataEmployee.Id;
            }

            return new Guid();
        }
    }
}