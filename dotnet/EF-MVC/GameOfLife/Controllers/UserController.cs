using System;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using System.Data;
using GameOfLife.Models;
using PagedList;
using System.Collections.Generic;


namespace GameOfLife.Controllers
{
    public class UserController : Controller
    {

        private GameOfLifeContext _dbContext = new GameOfLifeContext();

        private int _pageSize = 10;

        private IEnumerable<SelectListItem> _defaultItem
        {
            get
            {
                return Enumerable.Repeat(new SelectListItem
                {
                    Value = "0",
                    Text = "-------Select One --------"
                }, count: 1);
            }
        }

        public ViewResult Index(string sortOrder, string currentFilter, string searchString, int? page)
        {
            ViewBag.CurrentSort = sortOrder;
            ViewBag.NameSortParm = String.IsNullOrEmpty(sortOrder) ? "username" : "";
            ViewBag.EnabledSortParm = sortOrder == "enabled_true" ? "enabled_false" : "enabled_true";
            ViewBag.RoleSortParm = sortOrder == "role_asc" ? "role_desc" : "role_asc";

            if (searchString != null){
                page = 1;
            }else            {
                searchString = currentFilter;
            }

            ViewBag.CurrentFilter = searchString;

            var users = _dbContext.Users.Select(u => u);

            if (!String.IsNullOrEmpty(searchString))
            {
                users = users.Where(s => s.Username.Contains(searchString));
            }
            switch (sortOrder)
            {
                case "username":
                    users = users.OrderByDescending(s => s.Username);
                    break;
                case "enabled_true":
                    users = users.OrderBy(s => s.Enabled);
                    break;
                case "enabled_false":
                    users = users.OrderByDescending(s => s.Enabled);
                    break;
                case "role_asc":
                    users = users.OrderBy(s => s.Role1.Name);
                    break;
                case "role_desc":
                    users = users.OrderByDescending(s => s.Role1.Name);
                    break;
                default:  
                    users = users.OrderBy(s => s.Username);
                    break;
            }

            int pageNumber = (page ?? 1);
            return View(users.ToPagedList(pageNumber, _pageSize));
        }

        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var user = _dbContext.Users.SingleOrDefault(u => u.Id == id);
            if (user == null)
            {
                return HttpNotFound();
            }
            ViewBag.Roles = GetRoles();
            return View(user);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, [Bind(Include = "Id,Username,Enabled,Role")] User user)
        {
            if (id != user.Id)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            
            if (ModelState.IsValid)
            {
                var userToUpdate = _dbContext.Users.Find(id);
                if (!UserExists(user.Id))
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
                else
                {
                    if (TryUpdateModel(userToUpdate, "", new string[] { "Username", "Enabled", "Role" }))
                    {
                        try
                        {
                            _dbContext.SaveChanges();
                            return RedirectToAction(nameof(Index));
                        }
                        catch (DataException ex)
                        {
                            ModelState.AddModelError("", "Unable to save changes. Try again, and if the problem persists see your system administrator.");
                        }
                    }
                }
            }
            return View(user);
        }

        public ActionResult Create()
        {
            ViewBag.Roles = GetRoles();
            return View(new User { Enabled = true });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Username,Enabled,Role")] User user)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    user.CreatedOn = DateTime.Now;
                    _dbContext.Users.Add(user);
                    _dbContext.SaveChanges();
                    return RedirectToAction("Index");
                }
            }
            catch (DataException ex)
            {
                ModelState.AddModelError("", "Unable to save changes. Try again, and if the problem persists see your system administrator.");
            }
            return View(User);
        }

        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var user = _dbContext.Users.SingleOrDefault(u => u.Id == id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            User user = _dbContext.Users.Find(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        private IEnumerable<SelectListItem> GetRoles()
        {
            var roles = _dbContext.Roles.Select(r => r).ToList().Where(r => r.Name.ToLowerInvariant() != "admin");
            var allRoles = _defaultItem.Union(roles.Select(f => new SelectListItem
            {
                Value = f.Id.ToString(),
                Text = f.Name
            }));
            return allRoles;
        }

        private bool UserExists(int id)
        {
            return _dbContext.Users.Any(u => u.Id == id);
        }

        protected override void Dispose(bool disposing)
        {
            _dbContext.Dispose();
            base.Dispose(disposing);
        }

        
    }
}