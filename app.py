from flask import Flask, send_file, request, redirect,flash,url_for, render_template, jsonify
import mysql.connector


app = Flask(__name__)

conexion = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "",
    database = "bd_ejidatarios"
)

conexion_bd_usuarios = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "",
    database = "usuarios"
)

#REGISTRO DE EJIDATARIOS
@app.route('/inicioSistema/registroEjidatario', methods = ['POST'])
def crearEjidatario():
    datos = request.get_json()
    nombre = datos['nombre']
    apellidoP = datos['apellidoP']
    apellidoM = datos['apellidoM']
    fechaN = datos['fecha']
    telefono = datos['telefono']
    sexo = datos['sexo']
    estadoCivil = datos['estadoCivil']
    email = datos['email']
    codigoP = datos['cp']
    estado = datos['estado']
    municipio = datos['estado']
    localidad = datos['localidad']
    direccion = datos['direccion']
    calle = datos['calle']
    entreCalle = datos['entreCalle']

    conn = conexion
    cursor = conn.cursor(dictionary=True)

    newEjidatario = "INSERT INTO Ejidatrios (nombre_ejidatario, apellido_paterno, apellido_materno, fecha_nacimiento, num_telefono, sexo, estado_civil, correo_electronico, codigo_postal, estado, municipio, localidad, direccion, calle, entre_calle) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    values = (nombre, apellidoP, apellidoM, fechaN, telefono, sexo, estadoCivil, email, codigoP, estado, municipio, localidad, direccion, calle, entreCalle)

    cursor.execute(newEjidatario, values)
    #ejidatarioCreado = cursor.fetchone()

    conn.commit()

    #cursor.close()
    #conn.close()

    return jsonify({'status': 'success', 'message': 'Ejidatario creado correctamente'}) 

#BUSCAR EJIDATARIO
@app.route('/buscarEjidatario/<id>')
def buscar(id):
    
    conn = conexion
    cursor = conn.cursor(dictionary=True)
    consulta = ("SELECT * FROM Ejidatrios WHERE id_ejidatario = %s", (id,))
    cursor.execute(*consulta)

    resultado = cursor.fetchone()

    conn.commit()

    if resultado is None:
        return jsonify({'menssage': 'Usuario no encontrado'}),404

    return jsonify(resultado)

#CONSULTA DE EJIDATARIOS
@app.route('/inicioSistema/datosEjidatarios')
def obtenerDatos():
    conn = conexion
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Ejidatrios")
    resultados = cursor.fetchall()

    conn.commit()

    return jsonify(resultados)

#BOTON ELIMINAR EJIDATARIOS
@app.route('/eliminar/<id>', methods=['DELETE'])
def eliminar(id):
    
    conn = conexion
    cursor = conn.cursor(dictionary=True)
    consulta = ("DELETE FROM Ejidatrios WHERE id_ejidatario = %s", (id,))
    cursor.execute(*consulta)

    conn.commit()

    if cursor.rowcount == 0:
        return jsonify({'menssage': 'No se elimino ningun registro'}),404
    else:
        return jsonify({'menssage': 'Registro eliminado correctamente'}),200

#BOTON MODIFICAR EJIJATARIOS
@app.route('/modificar/<id>', methods=['PUT'])
def modificar(id):

    conn = conexion
    cursor = conn.cursor(dictionary=True)

    ejidatario = request.get_json()
    nombre = ejidatario['nombre']
    apellidoP = ejidatario['apellidoP']
    apellidoM = ejidatario['apellidoM']
    fechaN = ejidatario['fecha']
    telefono = ejidatario['telefono']
    sexo = ejidatario['sexo']
    estadoCivil = ejidatario['estadoCivil']
    email = ejidatario['email']
    codigoP = ejidatario['cp']
    estado = ejidatario['estado']
    municipio = ejidatario['estado']
    localidad = ejidatario['localidad']
    direccion = ejidatario['direccion']
    calle = ejidatario['calle']
    entreCalle = ejidatario['entreCalle']


    consulta = ("UPDATE Ejidatrios SET nombre_ejidatario = %s, apellido_paterno = %s, apellido_materno = %s, fecha_nacimiento = %s, num_telefono = %s, sexo = %s, estado_civil = %s, correo_electronico = %s, codigo_postal = %s, estado = %s, municipio = %s, localidad = %s, direccion = %s, calle = %s, entre_calle = %s WHERE id_ejidatario = %s", (nombre, apellidoP, apellidoM, fechaN, telefono, sexo, estadoCivil, email, codigoP, estado, municipio, localidad, direccion, calle, entreCalle, id))
    cursor.execute(*consulta)

    ejidatarioModificado = cursor.fetchone()
    conn.commit()

    #if ejidatarioModificado is None:
    #    return jsonify({'menssage': 'Usuario no encontrado'}),404

    return jsonify(ejidatarioModificado)

#REGISTRO DE PARCELAS
@app.route('/inicioSistema/registroParcela', methods = ['POST'])
def registrarParcela():
    datosP = request.get_json()
    
    largo = datosP['largo']
    ancho = datosP['ancho']
    metrosCuadrados = datosP['metrosCuadrados']
    propietario = datosP['propietario']

    conn = conexion
    cursor = conn.cursor(dictionary=True)

    newParcela = "INSERT INTO Parcelas (largo, ancho, metros_cuadrados, nombre_propietario) VALUES (%s,%s,%s,%s)"
    values = (largo, ancho, metrosCuadrados, propietario)

    cursor.execute(newParcela, values)
    parcelaCreada = cursor.fetchone()

    conn.commit()

    #cursor.close()
    #conn.close()

    return jsonify(parcelaCreada)


#CONSULTA PARCELAS
@app.route('/inicioSistema/datosParcelas')
def datosParcela():
    conn = conexion
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Parcelas")
    resultados = cursor.fetchall()

    conn.commit()

    return jsonify(resultados)

#BOTON ELIMINAR PARCELAS
@app.route('/eliminarP/<id>', methods=['DELETE'])
def eliminarP(id):
    
    conn = conexion
    cursor = conn.cursor(dictionary=True)
    consulta = ("DELETE FROM Parcelas WHERE id_parcela = %s", (id,))
    cursor.execute(*consulta)

    conn.commit()

    if cursor.rowcount == 0:
        return jsonify({'menssage': 'No se elimino ningun registro'}),404
    else:
        return jsonify({'menssage': 'Registro eliminado correctamente'}),200

#BOTON MODIFICAR PARCELAS
@app.route('/modificarP/<id>', methods=['PUT'])
def modificarP(id):

    conn = conexion
    cursor = conn.cursor(dictionary=True)

    parcela = request.get_json()
    largo = parcela['largo']
    ancho = parcela['ancho']
    metrosCuadrados = parcela['metrosCuadrados']
    propietario = parcela['propietario']

    consulta = ("UPDATE Parcelas SET largo = %s, ancho = %s, metros_cuadrados = %s, nombre_propietario = %s, id_parcela = %s", ( largo, ancho, metrosCuadrados, propietario, id))
    cursor.execute(*consulta)

    parcelaModificada = cursor.fetchone()
    conn.commit()

    #if ejidatarioModificado is None:
    #    return jsonify({'menssage': 'Usuario no encontrado'}),404

    return jsonify(parcelaModificada)

#BUSCAR PARCELA
@app.route('/buscarParcela/<id>')
def buscarParcela(id):
    
    conn = conexion
    cursor = conn.cursor(dictionary=True)
    consulta = ("SELECT * FROM Parcelas WHERE id_parcela = %s", (id,))
    cursor.execute(*consulta)

    resultado = cursor.fetchone()

    conn.commit()

    if resultado is None:
        return jsonify({'menssage': 'Usuario no encontrado'}),404

    return jsonify(resultado)

"""
#Buscar ejidatatrio
@app.route('/buscarEjidatario', methods=['POST'])
def buscar():
    datosB = request.get_json()
    
    idEjidatario = datosB['buscar'] 
    
    conn = conexion
    cursor = conn.cursor(dictionary=True)
    consulta = "SELECT id_ejidatario FROM Ejidatrios WHERE id_ejidatario = %s"
    cursor.execute(consulta, [idEjidatario])

    resultado = cursor.fetchone()


    if resultado is None:
        return jsonify({'menssage': 'Usuario no encontrado'}),404

    ejidatario = resultado['id_ejidatario']

    return jsonify(ejidatario)
"""



#REGISTRO DE PAGOS
@app.route('/inicioSistema/registroPagos', methods = ['POST'])
def registrarPago():
    datosPa = request.get_json()
    
    nomPropietario = datosPa['nomPropietario']
    concepto = datosPa['concepto']
    numParcela = datosPa['numParcela']
    localidad = datosPa['localidad']
    monto = datosPa['monto']
    adeudos = datosPa['adeudos']
    totalP = datosPa['total']

    conn = conexion
    cursor = conn.cursor(dictionary=True)

    newPago = "INSERT INTO Pagos (nombre_propietario, concepto, numero_parcela, localidad, monto, adeudos, total) VALUES (%s,%s,%s,%s,%s,%s,%s)"
    values = (nomPropietario, concepto, numParcela, localidad, monto, adeudos, totalP)

    cursor.execute(newPago, values)
    pagoCreado = cursor.fetchone()

    conn.commit()

    #cursor.close()
    #conn.close()

    return jsonify(pagoCreado)

#CONSULTA DE PAGOS
@app.route('/inicioSistema/datosPagos')
def datosPagos():
    conn = conexion
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Pagos")
    resultados = cursor.fetchall()

    conn.commit()

    return jsonify(resultados)

#BOTON ELIMINAR PAGOS
@app.route('/eliminarPagos/<id>', methods=['DELETE'])
def eliminarPagos(id):
    
    conn = conexion
    cursor = conn.cursor(dictionary=True)
    consulta = ("DELETE FROM Pagos WHERE id_pago = %s", (id,))
    cursor.execute(*consulta)

    conn.commit()

    if cursor.rowcount == 0:
        return jsonify({'menssage': 'No se elimino ningun registro'}),404
    else:
        return jsonify({'menssage': 'Registro eliminado correctamente'}),200

#BOTON MODIFICAR PAGOS
@app.route('/modificarPagos/<id>', methods=['PUT'])
def modificarPagos(id):

    conn = conexion
    cursor = conn.cursor(dictionary=True)

    pagos = request.get_json()
    nomPropietario = pagos['nomPropietario']
    concepto = pagos['concepto']
    numParcela = pagos['numParcela']
    localidad = pagos['localidad']
    monto = pagos['monto']
    adeudos = pagos['adeudos']
    totalP = pagos['total']

    consulta = ("UPDATE Pagos SET nombre_propietario = %s, concepto = %s, numero_parcela = %s, localidad = %s, monto = %s, adeudos = %s, total = %s, id_pago = %s", ( nomPropietario, concepto, numParcela, localidad, monto, adeudos, totalP, id))
    cursor.execute(*consulta)

    pagoModificado = cursor.fetchone()
    conn.commit()

    #if ejidatarioModificado is None:
    #    return jsonify({'menssage': 'Usuario no encontrado'}),404

    return jsonify(pagoModificado)

#BUSCAR PAGO
@app.route('/buscarPagos/<id>')
def buscarPagos(id):
    
    conn = conexion
    cursor = conn.cursor(dictionary=True)
    consulta = ("SELECT * FROM Pagos WHERE id_pago = %s", (id,))
    cursor.execute(*consulta)

    resultado = cursor.fetchone()

    conn.commit()

    if resultado is None:
        return jsonify({'menssage': 'Usuario no encontrado'}),404

    return jsonify(resultado)

#REGISTRO DE ADEUDOS
@app.route('/inicioSistema/registroAdeudos', methods = ['POST'])
def registrarAdeudos():
    datosA = request.get_json()
    
    numParcelaA = datosA['numParcela']
    anios = datosA['anios']
    total = datosA['totalA']

    conn = conexion
    cursor = conn.cursor(dictionary=True)

    newAdeudo = "INSERT INTO adeudos (numero_parcela, años, total) VALUES (%s,%s,%s)"
    values = (numParcelaA, anios, total)

    cursor.execute(newAdeudo, values)
    adeudoCreado = cursor.fetchone()

    conn.commit()

    #cursor.close()
    #conn.close()

    return jsonify(adeudoCreado)

#CONSULTA DE ADEUDOS
@app.route('/inicioSistema/datosAdeudos')
def datosAdeudos():
    conn = conexion
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM adeudos")
    resultados = cursor.fetchall()

    conn.commit()

    return jsonify(resultados)

#BOTON ELIMINAR ADEUDOS
@app.route('/eliminarAdeudos/<id>', methods=['DELETE'])
def eliminarAdeudos(id):
    
    conn = conexion
    cursor = conn.cursor(dictionary=True)
    consulta = ("DELETE FROM adeudos WHERE id_adeudo = %s", (id,))
    cursor.execute(*consulta)

    conn.commit()

    if cursor.rowcount == 0:
        return jsonify({'menssage': 'No se elimino ningun registro'}),404
    else:
        return jsonify({'menssage': 'Registro eliminado correctamente'}),200

#BOTON MODIFICAR ADEUDOS
@app.route('/modificarAdeudos/<id>', methods=['PUT'])
def modificarAdeudos(id):

    conn = conexion
    cursor = conn.cursor(dictionary=True)

    adeudos = request.get_json()
    numParcelaA = adeudos['numParcela']
    anios = adeudos['anios']
    total = adeudos['totalA']

    consulta = ("UPDATE adeudos SET numero_parcela = %s, años = %s, total = %s, id_adeudo = %s", ( numParcelaA, anios, total, id))
    cursor.execute(*consulta)

    adeudoModificado = cursor.fetchone()
    conn.commit()

    #if ejidatarioModificado is None:
    #    return jsonify({'menssage': 'Usuario no encontrado'}),404

    return jsonify(adeudoModificado)

#BUSCAR ADEUDO
@app.route('/buscarAdeudo/<id>')
def buscarAdeudo(id):
    
    conn = conexion
    cursor = conn.cursor(dictionary=True)
    consulta = ("SELECT * FROM adeudos WHERE id_adeudo = %s", (id,))
    cursor.execute(*consulta)

    resultado = cursor.fetchone()

    conn.commit()

    if resultado is None:
        return jsonify({'menssage': 'Usuario no encontrado'}),404

    return jsonify(resultado)

#PROCESAMINENTO DE DATOS LOGIN
@app.route('/login', methods=['GET', 'POST'])
def loginPost():

    datoL = request.get_json()
    correo = datoL['correo']
    passw = datoL['contrasenia']

    conn = conexion_bd_usuarios
    cursor = conn.cursor(dictionary=True)

    consulta = "SELECT * FROM login_usuarios WHERE correo_electronico_usuario = %s AND contrasenia_usuario = %s"
    valores = (correo, passw)

    cursor.execute(consulta, valores)

    resultado = cursor.fetchone()

    conn.commit()

    if resultado and correo == resultado['correo_electronico_usuario'] and passw == resultado['contrasenia_usuario']:
        # Devuelve una respuesta JSON indicando éxito
        return jsonify(success=True)
    else:
        # Devuelve una respuesta JSON indicando error
        return jsonify(success=False, error="Usuario o contraseña incorrectos")

#RENDERIZACION DEL SISTEMA
@app.route('/inicioSistema')
def inicioSistema():
    return render_template('sistema.html')

#RENDERIZACIÓN DE LA PAGINA PRINCIPAL
@app.route('/')
def index():
    
    return send_file('static/index.html')


if __name__ == "__main__":
    app.run(debug=True)

