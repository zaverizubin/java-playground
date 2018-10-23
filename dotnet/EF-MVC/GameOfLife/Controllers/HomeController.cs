using GameOfLife.Models;
using System.Web.Mvc;


namespace GameOfLife.Controllers
{
    public class HomeController : Controller
    {

        private GameOfLifeContext db = new GameOfLifeContext();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
          
            return View();
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}