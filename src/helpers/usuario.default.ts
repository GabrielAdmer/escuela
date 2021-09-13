import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { getRepository } from 'typeorm';

export const setDefaultUser = async () => {

  const userRepository = getRepository<Usuario>( Usuario );

  const defaultUser = await userRepository.createQueryBuilder()
    .where( 'email = :email', { email: 'admin@hotmail.com' } ).getOne();

  if ( !defaultUser ) {
    const adminUser = userRepository.create( {
      email: 'admin@hotmail.com',
      password: '12345678',
      rol: 'admin',
      nombre: "directora"
    } );

    return await userRepository.save( adminUser );

  }

};

