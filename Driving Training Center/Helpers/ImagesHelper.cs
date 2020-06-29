using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace Driving_Training_Center.Helpers
{
    public class ImagesHelper
    {
        public static string save(IFormFile file)
        {
            string image_name = Guid.NewGuid() + Path.GetExtension(file.FileName);
            using var image = Image.Load(file.OpenReadStream());

            image.Save("Images/original/" + image_name);

            image.Mutate(x => x.Resize(1200, 1200));
            image.Save("Images/xl/" + image_name);

            image.Mutate(x => x.Resize(800, 800));
            image.Save("Images/lg/" + image_name);

            image.Mutate(x => x.Resize(500, 500));
            image.Save("Images/md/" + image_name);

            image.Mutate(x => x.Resize(150, 150));
            image.Save("Images/sm/" + image_name);

            image.Mutate(x => x.Resize(50, 50));
            image.Save("Images/xs/" + image_name);

            return image_name;
        }

        public static void delete(string name)
        {
            string original = Path.Combine("Images/original/", name);

            if (File.Exists(original))
            {
                File.Delete(original);
            }

            string xl = Path.Combine("Images/xl/", name);
            
            if (File.Exists(xl))
            {
                File.Delete(xl);
            }


            string lg = Path.Combine("Images/lg/", name);

            if (File.Exists(lg))
            {
                File.Delete(lg);
            }

            string md = Path.Combine("Images/md/", name);

            if (File.Exists(md))
            {
                File.Delete(md);
            }

            string sm = Path.Combine("Images/sm/", name);

            if (File.Exists(sm))
            {
                File.Delete(sm);
            }

            string xs = Path.Combine("Images/xs/", name);

            if (File.Exists(xs))
            {
                File.Delete(xs);
            }
        }

        public static byte[] ConvertObjectToByteArray(object source)
        {
            var formatter = new BinaryFormatter();
            using (var memoryStream = new MemoryStream())
            {
                formatter.Serialize(memoryStream, source);
                return memoryStream.ToArray();
            }
        }
    }
}