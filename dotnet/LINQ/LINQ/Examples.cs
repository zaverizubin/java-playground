using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;

namespace LINQ
{
    class Examples
    {
        public void CountWords()
        {
            const string text = @"Historically, the world of data and the world of objects" +
                                @" have not been well integrated. Programmers work in C# or Visual Basic" +
                                @" and also in SQL or XQuery. On the one side are concepts such as classes," +
                                @" objects, fields, inheritance, and .NET Framework APIs. On the other side" +
                                @" are tables, columns, rows, nodes, and separate languages for dealing with" +
                                @" them. Data types often require translation between the two worlds; there are" +
                                @" different standard functions. Because the object world has no notion of query, a" +
                                @" query can only be represented as a string without compile-time type checking or" +
                                @" IntelliSense support in the IDE. Transferring data from SQL tables or XML trees to" +
                                @" objects in memory is often tedious and error-prone.";
            
            const string searchTerm = "data";

            //Convert the string into an array of words  
            string[] source = text.Split(new[] { '.', '?', '!', ' ', ';', ':', ',' }, StringSplitOptions.RemoveEmptyEntries);

            var wordCount = source.Count(s => s.ToLowerInvariant() == searchTerm);
            Console.WriteLine("{0} occurrences(s) of the search term \"{1}\" were found.", wordCount, searchTerm); 

        }
    
        public void SentencesWithWords()
        {
            const string text = @"Historically, the world of data and the world of objects " +
                                @"have not been well integrated. Programmers work in C# or Visual Basic " +
                                @"and also in SQL or XQuery. On the one side are concepts such as classes, " +
                                @"objects, fields, inheritance, and .NET Framework APIs. On the other side " +
                                @"are tables, columns, rows, nodes, and separate languages for dealing with " +
                                @"them. Data types often require translation between the two worlds; there are " +
                                @"different standard functions. Because the object world has no notion of query, a " +
                                @"query can only be represented as a string without compile-time type checking or " +
                                @"IntelliSense support in the IDE. Transferring data from SQL tables or XML trees to " +
                                @"objects in memory is often tedious and error-prone.";
        
            // Split the text block into an array of sentences.  
            string[] sentences = text.Split(new[] { '.', '?', '!' });  

            // Define the search terms. This list could also be dynamically populated at runtime.  
            string[] wordsToMatch = { "Historically", "data", "integrated" };

            var query = sentences.Select(
                s => new {words = s.Split(new[] {'.', '?', '!', ' ', ';', ':', ','}, StringSplitOptions.RemoveEmptyEntries).Distinct(), s})
                .Where(w => w.words.Intersect(wordsToMatch).Count() == wordsToMatch.Count())
                .Select(w => w.s);

            foreach (var str in query)
            {
                Console.WriteLine(str); 
            }

            
        }

        public void CharactersInAString()
        {
            const string aString = "ABCDE99F-J74-12-89A";

            var query = aString.ToCharArray().Where(Char.IsDigit);

            foreach (var c in query)
            {
                Console.Write(c + " ");  
            }
            Console.WriteLine();

            // Select all characters before the first '-'  
            query = aString.ToCharArray().TakeWhile(c => c != '-');
            Console.WriteLine(String.Join("", query));
            

        }
    
        public void UseRegex()
        {
            const string startFolder = @"C:\Program Files (x86)\Microsoft Visual Studio 10.0\";
            var searchTerm = new Regex(@"Visual (Basic|C#|C\+\+|Studio)");

            IEnumerable<FileInfo> fileList = GetFiles(startFolder);

            var query = fileList.Where(file => file.Extension.ToLowerInvariant() == ".htm")
                .Select(file => new {fileText = File.ReadAllText(file.FullName), file})
                .Select(o => new {matches = searchTerm.Matches(o.fileText), o.file})
                .Where(m => m.matches.Count > 0)
                .Select(f => new
                    {
                        name = f.file.FullName,
                        matchedValues = from Match match in f.matches
                                        select match.Value
                    });

            Console.WriteLine("The term \"{0}\" was found in:", searchTerm);

            foreach (var v in query)
            {
                Console.WriteLine(v.name.Substring(startFolder.Length - 1));
                foreach (var v2 in v.matchedValues)
                {
                    Console.WriteLine("  " + v2);
                }  
            }

        }
        
        static IEnumerable<FileInfo> GetFiles(string path)
        {
            if (!Directory.Exists(path))
                throw new DirectoryNotFoundException();

            string[] fileNames = Directory.GetFiles(path, "*.*", SearchOption.AllDirectories);
            return fileNames.Select(name => new FileInfo(name)).ToList();
        }  
    
        public void SortAndFilter()
        {
            string csvData = @"116, 99, 86, 90, 94" + Environment.NewLine +
                              @"120, 99, 82, 81, 79" + Environment.NewLine +
                              @"111, 97, 92, 81, 60" + Environment.NewLine +
                              @"114, 97, 89, 85, 82" + Environment.NewLine +
                              @"121, 96, 85, 91, 60" + Environment.NewLine +
                              @"122, 94, 92, 91, 91" + Environment.NewLine +
                              @"117, 93, 92, 80, 87" + Environment.NewLine +
                              @"118, 92, 90, 83, 78";

            string[] scores = csvData.Split(new[] { Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries);

            var query = scores.Select(s => new{sp= s.Split(new[] {','}),s}).OrderBy(f => f.sp[2]).Select(s => String.Join(",",s.sp));
            foreach (string str in query)
            {
                Console.WriteLine(str);
            }  
        }
    
        public void Reorder()
        {
            string csvData = @"Adams,Terry,120" + Environment.NewLine +
                             @"Fakhouri,Fadi,116" + Environment.NewLine +
                             @"Feng,Hanying,117" + Environment.NewLine +
                             @"Garcia,Cesar,114" + Environment.NewLine +
                             @"Garcia,Debra,115" + Environment.NewLine +
                             @"Garcia,Hugo,118" + Environment.NewLine +
                             @"Mortensen,Sven,113" + Environment.NewLine +
                             @"O'Donnell,Claire,112" + Environment.NewLine +
                             @"Omelchenko,Svetlana,111" + Environment.NewLine +
                             @"Tucker,Lance,119" + Environment.NewLine +
                             @"Tucker,Michael,122" + Environment.NewLine +
                             @"Zabokritski,Eugene,121";

            string[] scores = csvData.Split(new[] { Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries);
            var query = scores.Select(s => new { x = s.Split(new[] { ',' }) }).OrderBy(f => f.x[2]).Select(f => String.Format("{0},{1} {2}", f.x[2], f.x[1], f.x[0]));
            foreach (string str in query)
            {
                Console.WriteLine(str);
            } 
        }
        
        public void PopulateCollection()
        {
            var names = new []{"Omelchenko,Svetlana,111", "O'Donnell,Claire,112", "Mortensen,Sven,113", "Garcia,Cesar,114", "Fakhouri,Fadi,115"};
            var scores = new[]{"111, 97, 92, 81, 60", "112, 98, 74, 81, 75", "113, 45, 92, 87, 63", "114, 90, 91, 91, 70","115, 97, 85, 81, 79"};

            var query1 = names.Select(s => s.Split(new[] {','})).Select(s => new {id = Convert.ToInt32(s[2]), name = s[0] + " " + s[1] });
            var query2 = scores.Select(s => s.Split(new[] {','}).Reverse().Select(a => Convert.ToInt32(a)).ToArray()).Select(s => new {id= s[4], avg = s.Take(4).Average()});

            var query = query1.Join(query2, q1 => q1.id, q2 => q2.id, (q1, q2) => new {Name = q1.name, Average = q2.avg});

            foreach (var obj in query)
            {
                Console.WriteLine("{0} {1}", obj.Name, obj.Average);
            }
        }

        public void GroupBy()
        {
            string names1 = @"Bankov, Peter" + Environment.NewLine + 
                       @"Holm, Michael" + Environment.NewLine +  
                       @"Garcia, Hugo" + Environment.NewLine +    
                       @"Potra, Cristina" + Environment.NewLine +    
                       @"Noriega, Fabricio" + Environment.NewLine +    
                       @"Aw, Kam Foo" + Environment.NewLine +    
                       @"Beebe, Ann" + Environment.NewLine +    
                       @"Toyoshima, Tim" + Environment.NewLine +    
                       @"Guy, Wey Yuan" + Environment.NewLine +
                       @"Garcia, Debra" + Environment.NewLine; 

            string names2 = @"Liu, Jinghao" + Environment.NewLine +  
                            @"Bankov, Peter" + Environment.NewLine +  
                            @"Holm, Michael" + Environment.NewLine +  
                            @"Garcia, Hugo" + Environment.NewLine +  
                            @"Beebe, Ann" + Environment.NewLine +  
                            @"Gilchrist, Beth" + Environment.NewLine +  
                            @"Myrcha, Jacek" + Environment.NewLine +  
                            @"Giakoumakis, Leo" + Environment.NewLine +  
                            @"McLin, Nkenge" + Environment.NewLine +
                            @"El Yassir, Mehdi" + Environment.NewLine;

            var mergeQuery = names1.Split(new [] {Environment.NewLine}, StringSplitOptions.RemoveEmptyEntries)
                            .Union(names2.Split(new [] {Environment.NewLine}, StringSplitOptions.RemoveEmptyEntries));

            var query = mergeQuery.GroupBy(name => name.Split(',')[0][0], name => name);

            foreach (var obj in query)
            {
                Console.WriteLine(obj.Key);
                foreach (string name in obj)
                    Console.WriteLine("  {0}", name);
            }
        }
    
        public void Aggregate()
        {
            var scores = "111, 97, 92, 81, 60" + Environment.NewLine +
                         "112, 75, 84, 91, 39" + Environment.NewLine +
                         "113, 88, 94, 65, 91" + Environment.NewLine +
                         "114, 97, 89, 85, 82" + Environment.NewLine +
                         "115, 35, 72, 91, 70" + Environment.NewLine +
                         "116, 99, 86, 90, 94" + Environment.NewLine +
                         "117, 93, 92, 80, 87" + Environment.NewLine +
                         "118, 92, 90, 83, 78" + Environment.NewLine;

            var arr = scores.Split(new [] {Environment.NewLine}, StringSplitOptions.RemoveEmptyEntries);
            const int examNum = 3;

            var query = arr.Select(s => Convert.ToInt32(s.Split(new[] { ',' })[examNum]));
            var enumerable = query as int[] ?? query.ToArray();
            Console.WriteLine("Exam #{0}: Average:{1:##.##} High Score:{2} Low Score:{3}",
                 examNum, enumerable.Average(), enumerable.Max(), enumerable.Min());

            Console.WriteLine();

            var query1 = arr.Select(s => s.Split(new[] { ',' }).Select(p =>Convert.ToInt32(p)));
            foreach (var enumerable1 in query1)
            {
                var ints = enumerable1 as int[] ?? enumerable1.ToArray();
                Console.WriteLine("Candidate #{0}: Average:{1:##.##} High Score:{2} Low Score:{3}",
                 ints.ToArray()[0], ints.Average(), ints.Max(), ints.Min());
            }

            Console.WriteLine();


            var query2 = arr.Select(s => s.Split(new[] { ',' }).Skip(1).Select(p => Convert.ToInt32(p)));
            var results = query2.ToList();
            int columnCount = results[0].Count();
            for (int column = 0; column < columnCount; column++)
            {
                int column1 = column;
                var query3 = results.Select(r => r.ElementAt(column1)).ToArray();
                Console.WriteLine("Exam #{0}: Average:{1:##.##} High Score:{2} Low Score:{3}",
                        column + 1, query3.Average(), query3.Max(), query3.Min());   
                
            }
        }

        public void Reflection()
        {
            Assembly assembly = Assembly.Load("System.Core, Version=3.5.0.0, Culture=neutral, PublicKeyToken= b77a5c561934e089");

            var pubTypesQuery =
                assembly.GetTypes().Where(type => type.IsPublic).SelectMany(type =>
                    type.GetMethods()).Where(methodInfo => methodInfo.ReturnType.IsArray || (methodInfo.ReturnType.GetInterface(
                        typeof(IEnumerable<>).FullName) != null && methodInfo.ReturnType.FullName != "System.String"))
                        .GroupBy(methodInfo => methodInfo.ReflectedType.ToString(), methodInfo => methodInfo.ToString());

            foreach (var groupOfMethods in pubTypesQuery)
            {
                Console.WriteLine("Type: {0}", groupOfMethods.Key);
                foreach (var method in groupOfMethods)
                {
                    Console.WriteLine("  {0}", method);
                }
            }
           
             

            
        }
    
        public void FindFileByExtension()
        {
            const string startFolder = @"c:\program files\Microsoft Visual Studio 10.0\";

            var dir = new DirectoryInfo(startFolder);

            IEnumerable<FileInfo> fileList = dir.GetFiles("*.*", SearchOption.AllDirectories);

            var query = fileList.Where(f => f.Extension.ToLowerInvariant() == ".txt").OrderBy(f =>f.FullName);
            foreach (FileInfo fi in query)
            {
                Console.WriteLine(fi.FullName);
            }

            var fileInfo = query.OrderBy(f => f.CreationTime).Last();
            Console.WriteLine("\r\nThe newest .txt file is {0}. Creation time: {1}",
            fileInfo.FullName, fileInfo.CreationTime);  
        }

        public void QuerySize()
        {
            const string startFolder = @"C:\program files\Microsoft Visual Studio 10.0\";
            IEnumerable<string> fileList = Directory.GetFiles(startFolder, "*.*", SearchOption.AllDirectories);

            var query = fileList.Select(f => new FileInfo(f).Length);
            long[] fileLengths = query.ToArray();
            long largestFile = fileLengths.Max();
            long totalBytes = fileLengths.Sum();
            Console.WriteLine("There are {0} bytes in {1} files under {2}",
            totalBytes, fileList.Count(), startFolder);
            Console.WriteLine("The largest files is {0} bytes.", largestFile); 

        }
    
        class FileCompare : IEqualityComparer<FileInfo>  
        {  
            public bool Equals(FileInfo f1, FileInfo f2)  
            {  
                return (f1.Name == f2.Name &&  
                        f1.Length == f2.Length);  
            }  

            public int GetHashCode(FileInfo fi)  
            {  
                string s = String.Format("{0}{1}", fi.Name, fi.Length);  
                return s.GetHashCode();  
            }  
        }  

        public void CompareDirs()
        {
            const string pathA = @"C:\program files\Microsoft Visual Studio 10.0\";
            const string pathB = @"C:\program files\Microsoft Visual Studio 11.0\";

            var dir1 = new DirectoryInfo(pathA);
            var dir2 = new DirectoryInfo(pathB);

            IEnumerable<FileInfo> list1 = dir1.GetFiles("*.*", SearchOption.AllDirectories);
            IEnumerable<FileInfo> list2 = dir2.GetFiles("*.*", SearchOption.AllDirectories);

            var myFileCompare = new FileCompare();
            bool areIdentical = list1.SequenceEqual(list2, myFileCompare);

            Console.WriteLine(areIdentical? "the two folders are the same" : "The two folders are not the same");
            var queryCommonFiles = list1.Intersect(list2, myFileCompare);

            var commonFiles = queryCommonFiles as FileInfo[] ?? queryCommonFiles.ToArray();
            if (commonFiles.Any())
            {
                Console.WriteLine("The following files are in both folders:");
                foreach (var v in commonFiles)
                {
                    Console.WriteLine(v.FullName);
                }
            }
            else
            {
                Console.WriteLine("There are no common files in the two folders.");
            }

            var queryList1Only = list1.Except(list2, myFileCompare);

            Console.WriteLine("The following files are in list1 but not list2:");
            foreach (var v in queryList1Only)
            {
                Console.WriteLine(v.FullName);
            }  

        }
    
        public void QueryFilesBySize()
        {
            const string startFolder = @"c:\program files\Microsoft Visual Studio 10.0\";
            var dir = new DirectoryInfo(startFolder);
            IEnumerable<FileInfo> fileList = dir.GetFiles("*.*", SearchOption.AllDirectories);

            var query = fileList.Select(f => f.Length).Max();
            Console.WriteLine("The length of the largest file under {0} is {1} bytes", startFolder, query);
            Console.WriteLine();

            var longestFile = fileList.Where(f => f.Length > 0).OrderByDescending(f => f.Length).FirstOrDefault();
            if (longestFile != null)
                Console.WriteLine("The largest file under {0} is {1} with a length of {2} bytes", startFolder, longestFile.Name, longestFile.Length);
            Console.WriteLine();

            var smallestFile = fileList.Where(f => f.Length > 0).OrderBy(f => f.Length).FirstOrDefault();
            if (smallestFile != null)
                Console.WriteLine("The smallest file under {0} is {1} with a length of {2} bytes", startFolder, smallestFile.Name, smallestFile.Length);
            Console.WriteLine();

            var queryTenLargest = fileList.Where(f => f.Length > 0).OrderByDescending(f => f.Length).Take(10);
            Console.WriteLine("The 10 largest files under {0} are:", startFolder);
            foreach (var v in queryTenLargest)
            {
                Console.WriteLine("{0}: {1} bytes", v.Name, v.Length);
            }
            Console.WriteLine();

            // Group the files according to their size, leaving out files that are less than 20000 bytes. 
            var queryGroup =
                fileList.Where(f => f.Length >= 20000).GroupBy(f => f.Length / 20000).OrderByDescending(f => f.Key);
            foreach (var filegroup in queryGroup)
            {
                Console.WriteLine(filegroup.Key.ToString(CultureInfo.InvariantCulture));
                foreach (var item in filegroup)
                {
                    Console.WriteLine("\t{0}: {1}", item.Name, item.Length);
                }
            }  
        }

        class PortableKey
        {
            public string Name { private get; set; }
            public DateTime CreationTime { private get; set; }
            public long Length { get; set; }

            public override bool Equals(object obj)
            {
                var other = (PortableKey)obj;
                return other.CreationTime == CreationTime &&
                       other.Length == Length &&
                       other.Name == Name;
            }

            public override int GetHashCode()
            {
                string str = String.Format("{0}{1}{2}", CreationTime, Length, Name);
                return str.GetHashCode();
            }
            public override string ToString()
            {
                return String.Format("{0} {1} {2}", Name, Length, CreationTime);
            }
        }  

        public void QueryDuplicates()
        {
            const string startFolder = @"c:\program files\Microsoft Visual Studio 10.0\Common7";

            var dir = new DirectoryInfo(startFolder);
            IEnumerable<FileInfo> fileList = dir.GetFiles("*.*", SearchOption.AllDirectories);

            var query = fileList.GroupBy(f => f.Name).Where(f => f.Count() > 1);

            foreach(var group in query)
            {
                Console.WriteLine("Count = {0}",group.Count());
                foreach (var item in group){

                    Console.WriteLine("Filename = {0}", item.Name == String.Empty ? "[none]" : item.FullName);
                }
            }
            Console.WriteLine();

            var query1 = fileList.GroupBy(f => new PortableKey { Name = f.Name, CreationTime = f.CreationTime }).Where(f => f.Count() > 1);

            foreach (var group in query1)
            {
                Console.WriteLine("Count = {0}", group.Count());
                foreach (var item in group)
                {

                    Console.WriteLine("Filename = {0}, CreationTime = {1}", item.Name == String.Empty ? "[none]" : item.FullName, item.CreationTime);
                }
            }

        }
    }
}
