namespace API.Models
{
    public class MovieModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string MainPhotoPath { get; set; }
        public string TrailerPath { get; set; }
        public decimal Price { get; set; }
    }
}
