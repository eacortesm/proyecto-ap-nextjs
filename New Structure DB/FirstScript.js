db = db.getSiblingDB('test'); // Create/switch to your DB

db.createCollection("becas", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "descripcion", "requisitos", "beneficios", "estudiante", "tipo"],
      properties: {
        nombre: {
          bsonType: "string",
          description: "Must be unique string and is required"
        },
        descripcion: {
          bsonType: "string",
          description: "Required description"
        },
        requisitos: {
          bsonType: "string",
          description: "Required requirements"
        },
        beneficios: {
          bsonType: "string",
          description: "Required benefits"
        },
        procesoObtencion: {
          bsonType: "string"
        },
        estudiante: {
          bsonType: "objectId",
        },
        tipo: {
          enum: [
            "CulturalDeportiva", "FEITEC", "HorasEstudiante", 
            "HorasAsistente", "TutoriaEstudiantil", "Honor",
            "AsistenciaEspecial", "ExcelenciaAcademica", "MauricioCampos",
            "Dependiente", "EgresadoColegioCientifico", "Prestamo",
            "ExoneracionPorcentual", "TipTec"
          ],
          description: "a"
        }
        
      }
    }
  }
});


db.becas.createIndex({ nombre: 1 }, { unique: true });
db.becas.createIndex({ estudiante: 1 }, { unique: true });


db.createCollection("ofertas", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
       "_id", "titulo", "tipoTrabajo", "departamento", "descripcion", 
        "profesor", "fechaInicio", "fechaFin", "objetivos",
        "cantidadVacantes", "duracion", "requisitos", "estadoOferta"
      ],
      properties: {
        _id: {
          bsonType: "objectId"
        },
        titulo: {
          bsonType: "string",
          description: "Must be unique title"
        },
        tipoTrabajo: {
          bsonType: "string"
        },
        departamento: {
          bsonType: "string"
        },
        descripcion: {
          bsonType: "string"
        },
        profesor: {
          bsonType: "string"
        },
        fechaInicio: {
          bsonType: "string",
          pattern: "^\\d{4}-\\d{2}-\\d{2}$",
          description: "YYYY-MM-DD format"
        },
        fechaFin: {
          bsonType: "string",
          pattern: "^\\d{4}-\\d{2}-\\d{2}$"
        },
        objetivos: {
          bsonType: "string"
        },
        cantidadVacantes: {
          bsonType: "string"
        },
        duracion: {
          bsonType: "string"
        },
        requisitos: {
          bsonType: "string"
        },
        Semestre: {
          enum : ["I", "II"]
        },
        estadoOferta: {
          enum: ["ABIERTA", "CERRADA", "EN REVISION", "CANCELADA", "BLOQUEADA"]

        },
        estudiantesInteresados: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              correoEstudiante: { bsonType: "string" },
              aceptado: { bsonType: "bool" },
              promedioPonderado: { bsonType: "string" }
            }
          }
        },
        historial: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              campoModificado: { bsonType: "string" },
              valorAnterior: { bsonType: ["string", "bool", "array", "object"] },
              valorNuevo: { bsonType: ["string", "bool", "array", "object"] },
              fechaCambio: { 
                bsonType: "string",
                pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$" 
              }
            }
          }
        },
        Calificacion: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              estudiante: { bsonType: "objectId" },
              calificacion: { bsonType: "double" },
              comentario: { bsonType: "string" }
            }
          }
        }
      }
    }
  }
});

// Create indexes for Ofertas
db.ofertas.createIndex({ titulo: 1 }, { unique: true });
db.ofertas.createIndex({ estadoOferta: 1 });


db.createCollection("reportes", {
    validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "titulo", "descripcion"
      ], properties: {
        titulo: {
          bsonType: "string",
          description: "Must be unique title"
        },
        descripcion: {
          bsonType: "string",
          description: "Required description"
        },

      }}

}})

db.reportes.createIndex({ titulo: 1 }, { unique: true });

db.reportes.createIndex({ descripcion: 1 });


db.createCollection("usuarios", {
    validator:{

        $jsonSchema: {
      bsonType: "object",
      required: [
        "name", "apellidos", "email", "password",
        "tipoUsuario"
      ], properties:{
        name:{
          bsonType: "string",
          description: "Required name"
        },
        apellidos: {
          bsonType: "string",
          description: "Required last name"
        },
        email: {
          bsonType: "string",
          description: "Must be unique email and is required"
        },
        password: {
          bsonType: "string",
          description: "Required password"
        },
        tipoUsuario: {
          enum: ["ESTUDIANTE", "PROFESOR", "ADMINISTRADOR", "ESCUELA"],
          description: "Required user type"
        },
        contacto: {
          bsonType: "string",
          description: "Required contact information"
        },
        escuela: {
          bsonType: "string",
          description: "Required school information"
        },
        zonaTrabajo: {
          bsonType: "string",
          description: "Required work zone information"
        },
        carnet: {
          bsonType: "string",
          description: "Required student ID"
        },
        departamentoTrabajo: {
          bsonType: "string",
          description: "Required work department information"
        },
        telefono: {
          bsonType: "string",
          description: "Required phone number"
        },
        nivelAcademico: {
            bsonType: "string",
            description: "Required academic level"
            },
        carrera: {
            bsonType: "string",
            description: "Required career information"
            },
        promedioPonderado: {
            bsonType: "string",
            description: "Required weighted average"
        },
        Favoritos:{
          array: {
            items: {
              bsonType: "objectId"
            }
          }
        }
      }
    }

}})