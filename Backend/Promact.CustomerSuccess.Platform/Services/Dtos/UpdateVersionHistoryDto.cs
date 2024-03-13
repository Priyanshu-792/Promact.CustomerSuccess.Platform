using System;
using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateVersionHistoryDto
    {
        [Required]
        public Guid Id { get; set; }
        public Guid ProjectId { get; set; }

        public string ChangeType { get; set; }

        public string Changes { get; set; }

        public string ChangeReason { get; set; }


        public DateTime RevisionDate { get; set; }
  
        public DateTime ApprovalDate { get; set; }

        public string ApprovedBy { get; set; }
    }
}
