export const validation = (datos) => {
  let errors = [];
  const nameRegex = /^[a-zA-Z]+$/;
  const statsRegex = /^\d{1,3}$/;

  if (!datos.name) errors.name = "Please enter a name";
  if (!datos.image) errors.image = "Please enter a image";
  if (!datos.ps) errors.ps = "Please enter the life points";
  if (!datos.atk) errors.atk = "Please enter the attack points";
  if (!datos.def) errors.def = "Please enter the defense points";
  if (datos.types.length === 0) errors.types = "Please select a pokemon type";

  if (!nameRegex.test(datos.name))
    errors.name = "The name can only contain letters";

  if (datos.name.length > 15)
    errors.name = "The name can only contain up to 15 characters";

  if (!statsRegex.test(datos.ps) || datos.ps === "0")
    errors.ps = "Only numbers are allowed, up to 3 digits and cannot be zero.";
  if (!statsRegex.test(datos.atk) || datos.atk === "0")
    errors.atk = "Only numbers are allowed, up to 3 digits and cannot be zero.";
  if (!statsRegex.test(datos.def) || datos.def === "0")
    errors.def =
      "SOnly numbers are allowed, up to 3 digits and cannot be zero.";
  if (datos.vel && !statsRegex.test(datos.vel))
    errors.vel = "Only numbers are allowed, up to 3 digits.";
  if (datos.height && !statsRegex.test(datos.height))
    errors.height = "Only numbers are allowed, up to 3 digits.";
  if (datos.weight && !statsRegex.test(datos.weight))
    errors.weight = "Only numbers are allowed, up to 3 digits.";

  if (!/\.(jpeg|jpg|gif|png)$/.test(datos.image))
    errors.image = "Please enter a valid image URL (jpeg, jpg, gif, png)";

  if (!/^(ftp|http|https):\/\/[^ "]+$/.test(datos.image))
    errors.image = "Please enter a valid image URL";

  return errors;
};
