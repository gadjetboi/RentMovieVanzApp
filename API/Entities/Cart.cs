using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Cart
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string MainPhoto { get; set; }
        public decimal Price { get; set; }
    }
}
