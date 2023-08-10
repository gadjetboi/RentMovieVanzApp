namespace API.Models
{
    public class CartModel
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? MainPhoto { get; set; }
        public decimal Price { get; set; }
    }
}