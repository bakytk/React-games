import {
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
  validateOrReject,
  ValidationOptions,
  ValidateIf
} from "class-validator";

export function IsNullable(validationOptions?: ValidationOptions) {
  return ValidateIf((_object, value) => value !== null, validationOptions);
}

class RegisterUser {
  @IsString() username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(10)
  password: string;

  @IsString()
  @IsNullable()
  country: string;

  @IsString()
  @IsNullable()
  firstName: string;

  @IsString()
  @IsNullable()
  lastName: string;
}

class LoginUser {
  @IsString() username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(10)
  password: string;
}

export const validation = action => async (req, res, next) => {
  let user;
  if (action === "registration") {
    user = new RegisterUser();
    user.username = req.body.username;
    user.password = req.body.password;
    user.country = req.body.country;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
  } else if (action === "login") {
    user = new LoginUser();
    user.username = req.body.username;
    user.password = req.body.password;
  } else {
    res.status(401).send("Unauthorized");
  }

  try {
    await validateOrReject(user);
    next();
  } catch (errors) {
    console.error("validation errors: ", errors);
    res.status(401).send("Unauthorized");
  }
};
