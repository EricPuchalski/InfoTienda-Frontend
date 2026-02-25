import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(100, 'El nombre no puede exceder los 100 caracteres'),
  lastName: z
    .string()
    .min(1, 'El apellido es obligatorio')
    .max(100, 'El apellido no puede exceder los 100 caracteres'),
  email: z
    .string()
    .min(1, 'El correo electrónico es obligatorio')
    .email('El formato del correo electrónico es inválido')
    .max(150, 'El correo no puede exceder los 150 caracteres'),
  password: z
    .string()
    .min(1, 'La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(72, 'La contraseña no puede exceder los 72 caracteres')
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
      'La contraseña debe incluir al menos una mayúscula, una minúscula y un número'
    ),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
