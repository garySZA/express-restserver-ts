import { Request, Response, response } from 'express';
import { User } from '../models';

export const getUsers = async ( req: Request, resp: Response ) => {
    const users = await User.findAll();
    
    resp.json( { users } );
};

export const getUser = async ( req: Request, resp: Response ) => {
    const { id } = req.params;
    
    const user = await User.findByPk( id );

    if( !user ) {
        return resp.status( 404 ).json({
            msg: `No existe un usuario con el id ${ id }`
        })
    }

    resp.json({ user });
};

export const postUser = async ( req: Request, resp: Response ) => {
    const { body } = req;
    
    try {
        
        const existEmail = await User.findOne({
            where: {
                email: body.email
            }
        });

        if( existEmail ){
            return resp.status( 400 ).json({
                msg: 'Ya existe un usuario con el email ' + body.email
            });
        };

        const user = await User.create( body );

        resp.json({ user })

    } catch (error: any) {
        console.log( error );

        resp.status( 500 ).json({
            msg: 'Contacte con el administrador'
        })
    }
};

export const putUser = async  ( req: Request, resp: Response ) => {
    const { id } = req.params;
    const { body } = req;
    
    try {
        
        const user = await User.findByPk( id );

        if( !user ){
            return resp.status( 404 ).json({
                msg: 'No existe un usuario con el id ' + id
            });
        };

        await user.update( body );

        resp.json( user );

    } catch (error: any) {
        console.log( error );

        resp.status( 500 ).json({
            msg: 'Contacte con el administrador'
        })
    }
};

export const deleteUser = async ( req: Request, resp: Response ) => {
    const { id } = req.params;
    
    const user = await User.findByPk( id );
    if( !user ){
        return resp.status( 404 ).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }

    await user.update({ state: false });

    resp.json({
        user
    });
};