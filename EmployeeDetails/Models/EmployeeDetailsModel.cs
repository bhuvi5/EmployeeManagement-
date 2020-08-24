using System.ComponentModel.DataAnnotations;

namespace EmployeeDetails.Models
{
    public class EmployeeDetailsModel
    {
        public System.Guid Id { get; set; }
        public string EmployeeId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public long? Code { get; set; }
        public System.DateTime? CreatedOn { get; set; }
        [Required]
        public string MobileNumber { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; } 
        public string State { get; set; }
        public string Country { get; set; }
        public string Pincode { get; set; }
        public Gender EmployeeGender { get; set; }

    }

    public enum Gender
    {
        Male ='M',
        Female ='F',
        Others='O'
    }
}