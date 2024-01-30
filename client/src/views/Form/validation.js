export const validation = (datos) => {
  let errors = [];
  const nameRegex = /^[a-zA-Z]+$/;
  const statsRegex = /^\d{1,3}$/;

  if (!datos.name) errors.name = "Por favor, ingresa un nombre";
  if (!datos.image) errors.image = "Por favor, ingresa una imagen";
  if (!datos.ps) errors.ps = "Por favor, ingresa los puntos de vida";
  if (!datos.atk) errors.atk = "Por favor, ingresa los puntos de ataque";
  if (!datos.def) errors.def = "Por favor, ingresa los puntos de defensa";
  if (datos.types.length == 0)
    errors.types = "Por favor, selecciona un tipo de pokemon";

  if (!nameRegex.test(datos.name))
    errors.name = "El nombre solo puede contener letras";

  if (datos.name.length > 15)
    errors.name = "El nombre solo puede contener hasta 15 caracteres";

  if (!statsRegex.test(datos.ps))
    errors.ps = "Solo se permiten numeros, hasta 3 digitos";
  if (!statsRegex.test(datos.atk))
    errors.atk = "Solo se permiten numeros, hasta 3 digitos";
  if (!statsRegex.test(datos.def))
    errors.def = "Solo se permiten numeros, hasta 3 digitos";
  if (!statsRegex.test(datos.vel))
    errors.vel = "Solo se permiten numeros, hasta 3 digitos";
  if (!statsRegex.test(datos.height))
    errors.height = "Solo se permiten numeros, hasta 3 digitos";
  if (!statsRegex.test(datos.weight))
    errors.weight = "Solo se permiten numeros, hasta 3 digitos";

  if (!/\.(jpeg|jpg|gif|png)$/.test(datos.image))
    errors.image =
      "Por favor ingresa una URL de imagen vlida (jpeg, jpg, gif, png)";

  if (!/^(ftp|http|https):\/\/[^ "]+$/.test(datos.image))
    errors.image = "Por favor ingresa una URL de imagen valida";

  return errors;
};
