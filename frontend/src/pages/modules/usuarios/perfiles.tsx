import React, { useState } from 'react';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  MenuItem,
  FormControlLabel,
  Switch,
  IconButton,
  Chip,
  useTheme
} from '@mui/material';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import { useMutation, useQuery, gql } from '@apollo/client';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// --- QUERIES ---
const OBTENER_PROYECTOS = gql`
  query ObtenerProyectos {
    todosLosProyectos {
      idProyecto
      titulo
    }
  }
`;

const OBTENER_PARTICIPANTES = gql`
  query ObtenerParticipantes {
    todosLosParticipantes {
      idParticipante
      nombre
      apellido
      ci
      expedicion
      celular
      estado
      codigoEspecifico
      proyecto {
        idProyecto
      }
      tutor {
        idTutor
      }
      participanteExt {
        idParticipanteExt
        direccion
        institucion
      }
    }
  }
`;

const OBTENER_TUTORES = gql`
  query ObtenerTutores {
    todosLosTutores {
      idTutor
      codEmpleado
      nombre
      apellido
      ci
      expedicion
      celular
      direccion
      estado
      proyecto {
        idProyecto
      }
    }
  }
`;

const OBTENER_TRIBUNALES = gql`
  query ObtenerTribunales {
    todosLosTribunales {
      idTribunal
      especialidad
      nombre
      apellido
      ci
      expedicion
      celular
      direccion
      estado
    }
  }
`;

// --- MUTATIONS ---
const CREAR_USUARIO = gql`
  mutation CrearUsuario($username: String!, $email: String!, $password: String!) {
    crearUsuario(username: $username, email: $email, password: $password) {
      usuario { idUsuario }
      ok
      error
    }
  }
`;

const CREAR_PARTICIPANTE = gql`
  mutation CrearParticipante($idUsuario: ID!, $codigoEspecifico: String!, $nombre: String!, $apellido: String!, $celular: String!, $ci: String!, $expedicion: String!, $direccion: String, $institucion: String, $idProyecto: ID, $idTutor: ID) {
    crearParticipante(idUsuario: $idUsuario, codigoEspecifico: $codigoEspecifico, nombre: $nombre, apellido: $apellido, celular: $celular, ci: $ci, expedicion: $expedicion, direccion: $direccion, institucion: $institucion, idProyecto: $idProyecto, idTutor: $idTutor) {
      participante { idParticipante }
      ok
      error
    }
  }
`;

const EDITAR_PARTICIPANTE = gql`
  mutation EditarParticipante($idParticipante: ID!, $codigoEspecifico: String, $nombre: String, $apellido: String, $celular: String, $ci: String, $expedicion: String, $direccion: String, $institucion: String, $idProyecto: ID, $idTutor: ID) {
    editarParticipante(idParticipante: $idParticipante, codigoEspecifico: $codigoEspecifico, nombre: $nombre, apellido: $apellido, celular: $celular, ci: $ci, expedicion: $expedicion, direccion: $direccion, institucion: $institucion, idProyecto: $idProyecto, idTutor: $idTutor) {
      ok
      error
    }
  }
`;

const ELIMINAR_PARTICIPANTE = gql`
  mutation EliminarParticipante($idParticipante: ID!) {
    eliminarParticipante(idParticipante: $idParticipante) {
      ok
      error
    }
  }
`;

const CREAR_TUTOR = gql`
  mutation CrearTutor($idUsuario: ID!, $codEmpleado: String!, $nombre: String!, $apellido: String!, $celular: String!, $direccion: String!, $ci: String!, $expedicion: String!, $idProyecto: ID) {
    crearTutor(idUsuario: $idUsuario, codEmpleado: $codEmpleado, nombre: $nombre, apellido: $apellido, celular: $celular, direccion: $direccion, ci: $ci, expedicion: $expedicion, idProyecto: $idProyecto) {
      tutor { idTutor }
      ok
      error
    }
  }
`;

const EDITAR_TUTOR = gql`
  mutation EditarTutor($idTutor: ID!, $codEmpleado: String, $nombre: String, $apellido: String, $celular: String, $direccion: String, $ci: String, $expedicion: String, $idProyecto: ID) {
    editarTutor(idTutor: $idTutor, codEmpleado: $codEmpleado, nombre: $nombre, apellido: $apellido, celular: $celular, direccion: $direccion, ci: $ci, expedicion: $expedicion, idProyecto: $idProyecto) {
      ok
      error
    }
  }
`;

const ELIMINAR_TUTOR = gql`
  mutation EliminarTutor($idTutor: ID!) {
    eliminarTutor(idTutor: $idTutor) {
      ok
      error
    }
  }
`;

const CREAR_TRIBUNAL = gql`
  mutation CrearTribunal($idUsuario: ID!, $especialidad: String!, $nombre: String!, $apellido: String!, $celular: String!, $ci: String!, $expedicion: String!, $direccion: String!) {
    crearTribunal(idUsuario: $idUsuario, especialidad: $especialidad, nombre: $nombre, apellido: $apellido, celular: $celular, ci: $ci, expedicion: $expedicion, direccion: $direccion) {
      tribunal { idTribunal }
      ok
      error
    }
  }
`;

const EDITAR_TRIBUNAL = gql`
  mutation EditarTribunal($idTribunal: ID!, $especialidad: String, $nombre: String, $apellido: String, $celular: String, $ci: String, $expedicion: String, $direccion: String) {
    editarTribunal(idTribunal: $idTribunal, especialidad: $especialidad, nombre: $nombre, apellido: $apellido, celular: $celular, ci: $ci, expedicion: $expedicion, direccion: $direccion) {
      ok
      error
    }
  }
`;

const ELIMINAR_TRIBUNAL = gql`
  mutation EliminarTribunal($idTribunal: ID!) {
    eliminarTribunal(idTribunal: $idTribunal) {
      ok
      error
    }
  }
`;

const OBTENER_PERSONAL = gql`
  query ObtenerPersonal {
    todoElPersonal {
      idPersonal
      nombre
      apellido
      ci
      expedicion
      cargo
      direccion
      celular
      estado
      usuario {
        idUsuario
      }
    }
  }
`;

const CREAR_PERSONAL = gql`
  mutation CrearPersonal($idUsuario: ID!, $nombre: String!, $apellido: String!, $ci: String!, $expedicion: String!, $cargo: String!, $direccion: String!, $celular: String!) {
    crearPersonal(idUsuario: $idUsuario, nombre: $nombre, apellido: $apellido, ci: $ci, expedicion: $expedicion, cargo: $cargo, direccion: $direccion, celular: $celular) {
      personal { idPersonal }
      ok
      error
    }
  }
`;

const EDITAR_PERSONAL = gql`
  mutation EditarPersonal($idPersonal: ID!, $nombre: String, $apellido: String, $ci: String, $expedicion: String, $cargo: String, $direccion: String, $celular: String) {
    editarPersonal(idPersonal: $idPersonal, nombre: $nombre, apellido: $apellido, ci: $ci, expedicion: $expedicion, cargo: $cargo, direccion: $direccion, celular: $celular) {
      ok
      error
    }
  }
`;

const ELIMINAR_PERSONAL = gql`
  mutation EliminarPersonal($idPersonal: ID!) {
    eliminarPersonal(idPersonal: $idPersonal) {
      ok
      error
    }
  }
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`perfiles-tabpanel-${index}`}
      aria-labelledby={`perfiles-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `perfiles-tab-${index}`,
    'aria-controls': `perfiles-tabpanel-${index}`
  };
}

const EXPEDICION_CHOICES = [
  { value: 'LP', label: 'La Paz' },
  { value: 'CB', label: 'Cochabamba' },
  { value: 'SC', label: 'Santa Cruz' },
  { value: 'OR', label: 'Oruro' },
  { value: 'PT', label: 'Potosí' },
  { value: 'CH', label: 'Chuquisaca' },
  { value: 'TJ', label: 'Tarija' },
  { value: 'BN', label: 'Beni' },
  { value: 'PD', label: 'Pando' }
];

const CARGO_CHOICES = [
  { value: 'SECRETARIA', label: 'Secretaria' },
  { value: 'DECANO', label: 'Decano' },
  { value: 'VICEDECANO', label: 'Vicedecano' },
  { value: 'RECTOR', label: 'Rector' },
  { value: 'VICERECTOR', label: 'Vicerector' },
];

const PerfilesPage: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  // Modal states
  const [openParticipante, setOpenParticipante] = useState(false);
  const [openTutor, setOpenTutor] = useState(false);
  const [openTribunal, setOpenTribunal] = useState(false);

  // Active records for editing
  const [activeParticipante, setActiveParticipante] = useState<any>(null);
  const [activeTutor, setActiveTutor] = useState<any>(null);
  const [activeTribunal, setActiveTribunal] = useState<any>(null);
  const [activePersonal, setActivePersonal] = useState<any>(null);

  // Modal state for Personal
  const [openPersonal, setOpenPersonal] = useState(false);

  // External Participant toggle
  const [isExterno, setIsExterno] = useState(false);

  // Queries
  const { data: dataParticipantes, refetch: refetchParticipantes } = useQuery(OBTENER_PARTICIPANTES);
  const { data: dataTutores, refetch: refetchTutores } = useQuery(OBTENER_TUTORES);
  const { data: dataTribunales, refetch: refetchTribunales } = useQuery(OBTENER_TRIBUNALES);
  const { data: dataProyectos } = useQuery(OBTENER_PROYECTOS);
  const { data: dataPersonal, refetch: refetchPersonal } = useQuery(OBTENER_PERSONAL);

  // Mutations
  const [crearUsuario] = useMutation(CREAR_USUARIO);
  
  const [crearParticipante] = useMutation(CREAR_PARTICIPANTE);
  const [editarParticipante] = useMutation(EDITAR_PARTICIPANTE);
  const [eliminarParticipante] = useMutation(ELIMINAR_PARTICIPANTE);

  const [crearTutor] = useMutation(CREAR_TUTOR);
  const [editarTutor] = useMutation(EDITAR_TUTOR);
  const [eliminarTutor] = useMutation(ELIMINAR_TUTOR);

  const [crearTribunal] = useMutation(CREAR_TRIBUNAL);
  const [editarTribunal] = useMutation(EDITAR_TRIBUNAL);
  const [eliminarTribunal] = useMutation(ELIMINAR_TRIBUNAL);

  const [crearPersonal] = useMutation(CREAR_PERSONAL);
  const [editarPersonal] = useMutation(EDITAR_PERSONAL);
  const [eliminarPersonal] = useMutation(ELIMINAR_PERSONAL);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // --- HANDLERS PARTICIPANTE ---
  const handleOpenParticipante = (row: any = null) => {
    if (row) {
      setActiveParticipante(row);
      setIsExterno(!!row.participanteExt);
    } else {
      setActiveParticipante(null);
      setIsExterno(false);
    }
    setOpenParticipante(true);
  };

  const handleDeleteParticipante = (id: string) => {
    MySwal.fire({
      title: '¿Eliminar Participante?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: theme.palette.error.main,
      cancelButtonColor: theme.palette.text.secondary,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await eliminarParticipante({ variables: { idParticipante: id } });
          if (res.data.eliminarParticipante.ok) {
            MySwal.fire('Eliminado', 'El participante fue eliminado.', 'success');
            refetchParticipantes();
          } else {
            MySwal.fire('Error', res.data.eliminarParticipante.error, 'error');
          }
        } catch (err: any) {
          MySwal.fire('Error', err.message, 'error');
        }
      }
    });
  };

  const handleSubmitParticipante = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      if (activeParticipante) {
        // Edit mode
        const resPart = await editarParticipante({
          variables: {
            idParticipante: activeParticipante.idParticipante,
            codigoEspecifico: formData.get('codigo_especifico') as string,
            nombre: formData.get('nombre') as string,
            apellido: formData.get('apellido') as string,
            ci: formData.get('ci') as string,
            expedicion: formData.get('expedicion') as string,
            celular: formData.get('celular') as string,
            direccion: isExterno ? (formData.get('direccion') as string) : null,
            institucion: isExterno ? (formData.get('institucion') as string) : null,
            idProyecto: formData.get('id_proyecto') || null,
            idTutor: formData.get('id_tutor') || null,
          }
        });
        if (!resPart.data.editarParticipante.ok) {
          MySwal.fire('Error', resPart.data.editarParticipante.error, 'error');
        } else {
          MySwal.fire('¡Éxito!', 'Participante actualizado exitosamente.', 'success');
          setOpenParticipante(false);
          refetchParticipantes();
        }
      } else {
        // Create mode
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        
        const resUsuario = await crearUsuario({ variables: { username, email, password } });
        if (!resUsuario.data.crearUsuario.ok) {
          MySwal.fire('Error', resUsuario.data.crearUsuario.error, 'error');
          return;
        }
        const idUsuario = resUsuario.data.crearUsuario.usuario.idUsuario;
        
        const resPart = await crearParticipante({
          variables: {
            idUsuario,
            codigoEspecifico: formData.get('codigo_especifico') as string,
            nombre: formData.get('nombre') as string,
            apellido: formData.get('apellido') as string,
            ci: formData.get('ci') as string,
            expedicion: formData.get('expedicion') as string,
            celular: formData.get('celular') as string,
            direccion: isExterno ? (formData.get('direccion') as string) : null,
            institucion: isExterno ? (formData.get('institucion') as string) : null,
            idProyecto: formData.get('id_proyecto') || null,
            idTutor: formData.get('id_tutor') || null,
          }
        });
        
        if (!resPart.data.crearParticipante.ok) {
          MySwal.fire('Error', resPart.data.crearParticipante.error, 'error');
        } else {
          MySwal.fire('¡Éxito!', 'Participante registrado exitosamente.', 'success');
          setOpenParticipante(false);
          refetchParticipantes();
        }
      }
    } catch (err: any) {
      console.error(err);
      MySwal.fire('Error', err.message || 'Error de red o servidor', 'error');
    }
  };

  // --- HANDLERS TUTOR ---
  const handleOpenTutor = (row: any = null) => {
    setActiveTutor(row);
    setOpenTutor(true);
  };

  const handleDeleteTutor = (id: string) => {
    MySwal.fire({
      title: '¿Eliminar Tutor?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: theme.palette.error.main,
      cancelButtonColor: theme.palette.text.secondary,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await eliminarTutor({ variables: { idTutor: id } });
          if (res.data.eliminarTutor.ok) {
            MySwal.fire('Eliminado', 'El tutor fue eliminado.', 'success');
            refetchTutores();
          } else {
            MySwal.fire('Error', res.data.eliminarTutor.error, 'error');
          }
        } catch (err: any) {
          MySwal.fire('Error', err.message, 'error');
        }
      }
    });
  };

  const handleSubmitTutor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      if (activeTutor) {
        const resTutor = await editarTutor({
          variables: {
            idTutor: activeTutor.idTutor,
            codEmpleado: formData.get('cod_empleado') as string,
            nombre: formData.get('nombre') as string,
            apellido: formData.get('apellido') as string,
            ci: formData.get('ci') as string,
            expedicion: formData.get('expedicion') as string,
            celular: formData.get('celular') as string,
            direccion: (formData.get('direccion') as string) || '',
            idProyecto: formData.get('id_proyecto') || null,
          }
        });
        if (!resTutor.data.editarTutor.ok) {
          MySwal.fire('Error', resTutor.data.editarTutor.error, 'error');
        } else {
          MySwal.fire('¡Éxito!', 'Tutor actualizado exitosamente.', 'success');
          setOpenTutor(false);
          refetchTutores();
        }
      } else {
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        
        const resUsuario = await crearUsuario({ variables: { username, email, password } });
        if (!resUsuario.data.crearUsuario.ok) {
          MySwal.fire('Error', resUsuario.data.crearUsuario.error, 'error');
          return;
        }
        const idUsuario = resUsuario.data.crearUsuario.usuario.idUsuario;
        
        const resTutor = await crearTutor({
          variables: {
            idUsuario,
            codEmpleado: formData.get('cod_empleado') as string,
            nombre: formData.get('nombre') as string,
            apellido: formData.get('apellido') as string,
            ci: formData.get('ci') as string,
            expedicion: formData.get('expedicion') as string,
            celular: formData.get('celular') as string,
            direccion: (formData.get('direccion') as string) || '',
            idProyecto: formData.get('id_proyecto') || null,
          }
        });
        
        if (!resTutor.data.crearTutor.ok) {
          MySwal.fire('Error', resTutor.data.crearTutor.error, 'error');
        } else {
          MySwal.fire('¡Éxito!', 'Tutor registrado exitosamente.', 'success');
          setOpenTutor(false);
          refetchTutores();
        }
      }
    } catch (err: any) {
      console.error(err);
      MySwal.fire('Error', err.message || 'Error de red o servidor', 'error');
    }
  };

  // --- HANDLERS TRIBUNAL ---
  const handleOpenTribunal = (row: any = null) => {
    setActiveTribunal(row);
    setOpenTribunal(true);
  };

  const handleDeleteTribunal = (id: string) => {
    MySwal.fire({
      title: '¿Eliminar Tribunal?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: theme.palette.error.main,
      cancelButtonColor: theme.palette.text.secondary,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await eliminarTribunal({ variables: { idTribunal: id } });
          if (res.data.eliminarTribunal.ok) {
            MySwal.fire('Eliminado', 'El tribunal fue eliminado.', 'success');
            refetchTribunales();
          } else {
            MySwal.fire('Error', res.data.eliminarTribunal.error, 'error');
          }
        } catch (err: any) {
          MySwal.fire('Error', err.message, 'error');
        }
      }
    });
  };

  const handleSubmitTribunal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      if (activeTribunal) {
        const resTribunal = await editarTribunal({
          variables: {
            idTribunal: activeTribunal.idTribunal,
            especialidad: formData.get('especialidad') as string,
            nombre: formData.get('nombre') as string,
            apellido: formData.get('apellido') as string,
            ci: formData.get('ci') as string,
            expedicion: formData.get('expedicion') as string,
            celular: formData.get('celular') as string,
            direccion: (formData.get('direccion') as string) || '',
          }
        });
        if (!resTribunal.data.editarTribunal.ok) {
          MySwal.fire('Error', resTribunal.data.editarTribunal.error, 'error');
        } else {
          MySwal.fire('¡Éxito!', 'Tribunal actualizado exitosamente.', 'success');
          setOpenTribunal(false);
          refetchTribunales();
        }
      } else {
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        
        const resUsuario = await crearUsuario({ variables: { username, email, password } });
        if (!resUsuario.data.crearUsuario.ok) {
          MySwal.fire('Error', resUsuario.data.crearUsuario.error, 'error');
          return;
        }
        const idUsuario = resUsuario.data.crearUsuario.usuario.idUsuario;
        
        const resTribunal = await crearTribunal({
          variables: {
            idUsuario,
            especialidad: formData.get('especialidad') as string,
            nombre: formData.get('nombre') as string,
            apellido: formData.get('apellido') as string,
            ci: formData.get('ci') as string,
            expedicion: formData.get('expedicion') as string,
            celular: formData.get('celular') as string,
            direccion: (formData.get('direccion') as string) || '',
          }
        });
        
        if (!resTribunal.data.crearTribunal.ok) {
          MySwal.fire('Error', resTribunal.data.crearTribunal.error, 'error');
        } else {
          MySwal.fire('¡Éxito!', 'Tribunal registrado exitosamente.', 'success');
          setOpenTribunal(false);
          refetchTribunales();
        }
      }
    } catch (err: any) {
      console.error(err);
      MySwal.fire('Error', err.message || 'Error de red o servidor', 'error');
    }
  };

  // --- HANDLERS PERSONAL ---
  const handleOpenPersonal = (row: any = null) => {
    setActivePersonal(row);
    setOpenPersonal(true);
  };

  const handleDeletePersonal = (id: string) => {
    MySwal.fire({
      title: '¿Eliminar Personal?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: theme.palette.error.main,
      cancelButtonColor: theme.palette.text.secondary,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await eliminarPersonal({ variables: { idPersonal: id } });
          if (res.data.eliminarPersonal.ok) {
            MySwal.fire('Eliminado', 'El registro fue eliminado.', 'success');
            refetchPersonal();
          } else {
            MySwal.fire('Error', res.data.eliminarPersonal.error, 'error');
          }
        } catch (err: any) {
          MySwal.fire('Error', err.message, 'error');
        }
      }
    });
  };

  const handleSubmitPersonal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      if (activePersonal) {
        const res = await editarPersonal({
          variables: {
            idPersonal: activePersonal.idPersonal,
            nombre: formData.get('nombre') as string,
            apellido: formData.get('apellido') as string,
            ci: formData.get('ci') as string,
            expedicion: formData.get('expedicion') as string,
            cargo: formData.get('cargo') as string,
            direccion: formData.get('direccion') as string,
            celular: formData.get('celular') as string,
          }
        });
        if (!res.data.editarPersonal.ok) {
          MySwal.fire('Error', res.data.editarPersonal.error, 'error');
        } else {
          MySwal.fire('¡Éxito!', 'Personal actualizado exitosamente.', 'success');
          setOpenPersonal(false);
          refetchPersonal();
        }
      } else {
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const resUsuario = await crearUsuario({ variables: { username, email, password } });
        if (!resUsuario.data.crearUsuario.ok) {
          MySwal.fire('Error', resUsuario.data.crearUsuario.error, 'error');
          return;
        }
        const idUsuario = resUsuario.data.crearUsuario.usuario.idUsuario;

        const res = await crearPersonal({
          variables: {
            idUsuario,
            nombre: formData.get('nombre') as string,
            apellido: formData.get('apellido') as string,
            ci: formData.get('ci') as string,
            expedicion: formData.get('expedicion') as string,
            cargo: formData.get('cargo') as string,
            direccion: formData.get('direccion') as string,
            celular: formData.get('celular') as string,
          }
        });

        if (!res.data.crearPersonal.ok) {
          MySwal.fire('Error', res.data.crearPersonal.error, 'error');
        } else {
          MySwal.fire('¡Éxito!', 'Personal registrado exitosamente.', 'success');
          setOpenPersonal(false);
          refetchPersonal();
        }
      }
    } catch (err: any) {
      console.error(err);
      MySwal.fire('Error', err.message || 'Error de red o servidor', 'error');
    }
  };

  const renderChip = (label: string, color: 'success' | 'error' | 'warning' | 'info') => (
    <Chip 
      label={label} 
      color={color} 
      size="small" 
      variant="outlined" 
      sx={{ borderWidth: 1, opacity: 0.85, fontWeight: 500 }} 
    />
  );

  return (
    <MainCard title="Directorio y Perfiles">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="perfiles tabs">
            <Tab label="Participantes" {...a11yProps(0)} />
            <Tab label="Tutores" {...a11yProps(1)} />
            <Tab label="Tribunales" {...a11yProps(2)} />
            <Tab label="Personal" {...a11yProps(3)} />
          </Tabs>
        </Box>

        {/* ======================= PARTICIPANTES ======================= */}
        <CustomTabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5">Gestión de Participantes</Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpenParticipante()}>
              + Nuevo Participante
            </Button>
          </Box>
          <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre Completo</TableCell>
                  <TableCell>C.I.</TableCell>
                  <TableCell>Celular</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataParticipantes?.todosLosParticipantes && dataParticipantes.todosLosParticipantes.length > 0 ? (
                  dataParticipantes.todosLosParticipantes.map((row: any) => (
                    <TableRow key={row.idParticipante}>
                      <TableCell>{row.idParticipante}</TableCell>
                      <TableCell>{row.nombre} {row.apellido}</TableCell>
                      <TableCell>{row.ci} {row.expedicion}</TableCell>
                      <TableCell>{row.celular}</TableCell>
                      <TableCell>
                        {renderChip(row.participanteExt ? 'Externo' : 'Interno', row.participanteExt ? 'warning' : 'info')}
                      </TableCell>
                      <TableCell>
                        {renderChip(row.estado ? 'Activo' : 'Inactivo', row.estado ? 'success' : 'error')}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton color="primary" onClick={() => handleOpenParticipante(row)}><EditOutlined /></IconButton>
                        <IconButton color="error" onClick={() => handleDeleteParticipante(row.idParticipante)}><DeleteOutlined /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No hay participantes registrados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>

        {/* ======================= TUTORES ======================= */}
        <CustomTabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5">Gestión de Tutores</Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpenTutor()}>
              + Nuevo Tutor
            </Button>
          </Box>
          <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Cód. Empleado</TableCell>
                  <TableCell>Nombre Completo</TableCell>
                  <TableCell>C.I.</TableCell>
                  <TableCell>Celular</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataTutores?.todosLosTutores && dataTutores.todosLosTutores.length > 0 ? (
                  dataTutores.todosLosTutores.map((row: any) => (
                    <TableRow key={row.idTutor}>
                      <TableCell>{row.idTutor}</TableCell>
                      <TableCell>{row.codEmpleado}</TableCell>
                      <TableCell>{row.nombre} {row.apellido}</TableCell>
                      <TableCell>{row.ci} {row.expedicion}</TableCell>
                      <TableCell>{row.celular}</TableCell>
                      <TableCell>
                        {renderChip(row.estado ? 'Activo' : 'Inactivo', row.estado ? 'success' : 'error')}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton color="primary" onClick={() => handleOpenTutor(row)}><EditOutlined /></IconButton>
                        <IconButton color="error" onClick={() => handleDeleteTutor(row.idTutor)}><DeleteOutlined /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No hay tutores registrados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>

        {/* ======================= TRIBUNALES ======================= */}
        <CustomTabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5">Gestión de Tribunales</Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpenTribunal()}>
              + Nuevo Tribunal
            </Button>
          </Box>
          <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre Completo</TableCell>
                  <TableCell>Especialidad</TableCell>
                  <TableCell>C.I.</TableCell>
                  <TableCell>Celular</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataTribunales?.todosLosTribunales && dataTribunales.todosLosTribunales.length > 0 ? (
                  dataTribunales.todosLosTribunales.map((row: any) => (
                    <TableRow key={row.idTribunal}>
                      <TableCell>{row.idTribunal}</TableCell>
                      <TableCell>{row.nombre} {row.apellido}</TableCell>
                      <TableCell>{row.especialidad}</TableCell>
                      <TableCell>{row.ci} {row.expedicion}</TableCell>
                      <TableCell>{row.celular}</TableCell>
                      <TableCell>
                        {renderChip(row.estado ? 'Activo' : 'Inactivo', row.estado ? 'success' : 'error')}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton color="primary" onClick={() => handleOpenTribunal(row)}><EditOutlined /></IconButton>
                        <IconButton color="error" onClick={() => handleDeleteTribunal(row.idTribunal)}><DeleteOutlined /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No hay tribunales registrados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>
        {/* ======================= PERSONAL ======================= */}
        <CustomTabPanel value={tabValue} index={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5">Gestión de Personal</Typography>
            <Button variant="contained" color="primary" onClick={() => handleOpenPersonal()}>
              + Nuevo Personal
            </Button>
          </Box>
          <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre Completo</TableCell>
                  <TableCell>C.I.</TableCell>
                  <TableCell>Cargo</TableCell>
                  <TableCell>Celular</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataPersonal?.todoElPersonal && dataPersonal.todoElPersonal.length > 0 ? (
                  dataPersonal.todoElPersonal.map((row: any) => (
                    <TableRow key={row.idPersonal}>
                      <TableCell>{row.idPersonal}</TableCell>
                      <TableCell>{row.nombre} {row.apellido}</TableCell>
                      <TableCell>{row.ci} {row.expedicion}</TableCell>
                      <TableCell>{row.cargo}</TableCell>
                      <TableCell>{row.celular}</TableCell>
                      <TableCell>
                        {renderChip(row.estado ? 'Activo' : 'Inactivo', row.estado ? 'success' : 'error')}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton color="primary" onClick={() => handleOpenPersonal(row)}><EditOutlined /></IconButton>
                        <IconButton color="error" onClick={() => handleDeletePersonal(row.idPersonal)}><DeleteOutlined /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No hay personal registrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>

      </Box>

      {/* ======================= MODAL PARTICIPANTE ======================= */}
      <Dialog open={openParticipante} onClose={() => setOpenParticipante(false)} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmitParticipante}>
          <DialogTitle sx={{ pb: 2, fontSize: '1.25rem', fontWeight: 600 }}>
            {activeParticipante ? 'Editar Participante' : 'Registrar Participante'}
          </DialogTitle>
          <DialogContent dividers sx={{ bgcolor: 'background.default', p: { xs: 2, md: 3 } }}>
            
            {!activeParticipante && (
              <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 2, p: 3, mb: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 0.5 }}>Datos de Usuario</Typography>
                  <Typography variant="body2" color="text.secondary">Credenciales de acceso al sistema</Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}><TextField name="username" fullWidth label="Username" required size="small" /></Grid>
                  <Grid item xs={12} sm={4}><TextField name="email" fullWidth label="Email" type="email" required size="small" /></Grid>
                  <Grid item xs={12} sm={4}><TextField name="password" fullWidth label="Password" type="password" required size="small" /></Grid>
                </Grid>
              </Paper>
            )}

            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 2, p: 3, mb: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 0.5 }}>Datos Personales</Typography>
                <Typography variant="body2" color="text.secondary">Información básica del participante</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField name="nombre" defaultValue={activeParticipante?.nombre} fullWidth label="Nombres" required size="small" /></Grid>
                <Grid item xs={12} sm={6}><TextField name="apellido" defaultValue={activeParticipante?.apellido} fullWidth label="Apellidos" required size="small" /></Grid>
                <Grid item xs={12} sm={4}><TextField name="ci" defaultValue={activeParticipante?.ci} fullWidth label="C.I." required size="small" /></Grid>
                <Grid item xs={12} sm={4}>
                  <TextField name="expedicion" defaultValue={activeParticipante?.expedicion || 'LP'} fullWidth select label="Expedición" size="small">
                    {EXPEDICION_CHOICES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}><TextField name="celular" defaultValue={activeParticipante?.celular} fullWidth label="Celular" required size="small" /></Grid>
                <Grid item xs={12} sm={6}><TextField name="codigo_especifico" defaultValue={activeParticipante?.codigoEspecifico} fullWidth label="Código Específico (Matrícula/Registro)" required size="small" /></Grid>
                <Grid item xs={12}>
                  <TextField name="id_proyecto" defaultValue={activeParticipante?.proyecto?.idProyecto || ''} fullWidth select label="Proyecto" size="small">
                    <MenuItem value=""><em>Ninguno</em></MenuItem>
                    {dataProyectos?.todosLosProyectos?.map((p: any) => (
                      <MenuItem key={p.idProyecto} value={p.idProyecto}>{p.titulo}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField name="id_tutor" defaultValue={activeParticipante?.tutor?.idTutor || ''} fullWidth select label="Tutor" size="small">
                    <MenuItem value=""><em>Ninguno</em></MenuItem>
                    {dataTutores?.todosLosTutores?.map((t: any) => (
                      <MenuItem key={t.idTutor} value={t.idTutor}>{t.nombre} {t.apellido}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Paper>

            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 2, p: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 0.5 }}>Datos Adicionales</Typography>
                <Typography variant="body2" color="text.secondary">Información complementaria e institucional</Typography>
              </Box>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={isExterno ? 4 : 12}>
                  <FormControlLabel
                    control={<Switch checked={isExterno} onChange={(e) => setIsExterno(e.target.checked)} color="warning" />}
                    label="¿Es Participante Externo?"
                  />
                </Grid>
                {isExterno && (
                  <>
                    <Grid item xs={12} sm={4}><TextField name="institucion" defaultValue={activeParticipante?.participanteExt?.institucion} fullWidth label="Institución de Origen" required size="small" /></Grid>
                    <Grid item xs={12} sm={4}><TextField name="direccion" defaultValue={activeParticipante?.participanteExt?.direccion} fullWidth label="Dirección" required size="small" /></Grid>
                  </>
                )}
              </Grid>
            </Paper>

          </DialogContent>
          <DialogActions sx={{ p: 2, px: 3, bgcolor: 'background.paper' }}>
            <Button onClick={() => setOpenParticipante(false)} color="secondary" variant="outlined">Cancelar</Button>
            <Button type="submit" variant="contained" sx={{ px: 4 }}>
              {activeParticipante ? 'Actualizar Participante' : 'Guardar Participante'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* ======================= MODAL TUTOR ======================= */}
      <Dialog open={openTutor} onClose={() => setOpenTutor(false)} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmitTutor}>
          <DialogTitle sx={{ pb: 2, fontSize: '1.25rem', fontWeight: 600 }}>
            {activeTutor ? 'Editar Tutor' : 'Registrar Tutor'}
          </DialogTitle>
          <DialogContent dividers sx={{ bgcolor: 'background.default', p: { xs: 2, md: 3 } }}>
            
            {!activeTutor && (
              <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 2, p: 3, mb: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 0.5 }}>Datos de Usuario</Typography>
                  <Typography variant="body2" color="text.secondary">Credenciales de acceso al sistema</Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}><TextField name="username" fullWidth label="Username" required size="small" /></Grid>
                  <Grid item xs={12} sm={4}><TextField name="email" fullWidth label="Email" type="email" required size="small" /></Grid>
                  <Grid item xs={12} sm={4}><TextField name="password" fullWidth label="Password" type="password" required size="small" /></Grid>
                </Grid>
              </Paper>
            )}
            
            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 2, p: 3, mb: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 0.5 }}>Datos Personales</Typography>
                <Typography variant="body2" color="text.secondary">Información básica del tutor</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField name="nombre" defaultValue={activeTutor?.nombre} fullWidth label="Nombres" required size="small" /></Grid>
                <Grid item xs={12} sm={6}><TextField name="apellido" defaultValue={activeTutor?.apellido} fullWidth label="Apellidos" required size="small" /></Grid>
                <Grid item xs={12} sm={4}><TextField name="ci" defaultValue={activeTutor?.ci} fullWidth label="C.I." required size="small" /></Grid>
                <Grid item xs={12} sm={4}>
                  <TextField name="expedicion" defaultValue={activeTutor?.expedicion || 'LP'} fullWidth select label="Expedición" size="small">
                    {EXPEDICION_CHOICES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}><TextField name="celular" defaultValue={activeTutor?.celular} fullWidth label="Celular" required size="small" /></Grid>
              </Grid>
            </Paper>
            
            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 2, p: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 0.5 }}>Datos Institucionales</Typography>
                <Typography variant="body2" color="text.secondary">Información laboral del tutor</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField name="cod_empleado" defaultValue={activeTutor?.codEmpleado} fullWidth label="Código de Empleado" required size="small" /></Grid>
                <Grid item xs={12} sm={6}><TextField name="direccion" defaultValue={activeTutor?.direccion} fullWidth label="Dirección Particular" size="small" /></Grid>
                <Grid item xs={12}>
                  <TextField name="id_proyecto" defaultValue={activeTutor?.proyecto?.idProyecto || ''} fullWidth select label="Proyecto" size="small">
                    <MenuItem value=""><em>Ninguno</em></MenuItem>
                    {dataProyectos?.todosLosProyectos?.map((p: any) => (
                      <MenuItem key={p.idProyecto} value={p.idProyecto}>{p.titulo}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Paper>
          </DialogContent>
          <DialogActions sx={{ p: 2, px: 3, bgcolor: 'background.paper' }}>
            <Button onClick={() => setOpenTutor(false)} color="secondary" variant="outlined">Cancelar</Button>
            <Button type="submit" variant="contained" sx={{ px: 4 }}>
              {activeTutor ? 'Actualizar Tutor' : 'Guardar Tutor'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* ======================= MODAL TRIBUNAL ======================= */}
      <Dialog open={openTribunal} onClose={() => setOpenTribunal(false)} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmitTribunal}>
          <DialogTitle sx={{ pb: 2, fontSize: '1.25rem', fontWeight: 600 }}>
            {activeTribunal ? 'Editar Tribunal' : 'Registrar Tribunal'}
          </DialogTitle>
          <DialogContent dividers sx={{ bgcolor: 'background.default', p: { xs: 2, md: 3 } }}>
            
            {!activeTribunal && (
              <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 2, p: 3, mb: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 0.5 }}>Datos de Usuario</Typography>
                  <Typography variant="body2" color="text.secondary">Credenciales de acceso al sistema</Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}><TextField name="username" fullWidth label="Username" required size="small" /></Grid>
                  <Grid item xs={12} sm={4}><TextField name="email" fullWidth label="Email" type="email" required size="small" /></Grid>
                  <Grid item xs={12} sm={4}><TextField name="password" fullWidth label="Password" type="password" required size="small" /></Grid>
                </Grid>
              </Paper>
            )}
            
            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 2, p: 3, mb: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 0.5 }}>Datos Personales</Typography>
                <Typography variant="body2" color="text.secondary">Información básica del tribunal</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField name="nombre" defaultValue={activeTribunal?.nombre} fullWidth label="Nombres" required size="small" /></Grid>
                <Grid item xs={12} sm={6}><TextField name="apellido" defaultValue={activeTribunal?.apellido} fullWidth label="Apellidos" required size="small" /></Grid>
                <Grid item xs={12} sm={4}><TextField name="ci" defaultValue={activeTribunal?.ci} fullWidth label="C.I." required size="small" /></Grid>
                <Grid item xs={12} sm={4}>
                  <TextField name="expedicion" defaultValue={activeTribunal?.expedicion || 'LP'} fullWidth select label="Expedición" size="small">
                    {EXPEDICION_CHOICES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}><TextField name="celular" defaultValue={activeTribunal?.celular} fullWidth label="Celular" required size="small" /></Grid>
              </Grid>
            </Paper>
            
            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 2, p: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 0.5 }}>Datos Profesionales</Typography>
                <Typography variant="body2" color="text.secondary">Especialidad y formación</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField name="especialidad" defaultValue={activeTribunal?.especialidad} fullWidth label="Especialidad (ej. Ing. Sistemas)" required size="small" /></Grid>
                <Grid item xs={12} sm={6}><TextField name="direccion" defaultValue={activeTribunal?.direccion} fullWidth label="Dirección Particular" size="small" /></Grid>
              </Grid>
            </Paper>
          </DialogContent>
          <DialogActions sx={{ p: 2, px: 3, bgcolor: 'background.paper' }}>
            <Button onClick={() => setOpenTribunal(false)} color="secondary" variant="outlined">Cancelar</Button>
            <Button type="submit" variant="contained" sx={{ px: 4 }}>
              {activeTribunal ? 'Actualizar Tribunal' : 'Guardar Tribunal'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* ======================= MODAL PERSONAL ======================= */}
      <Dialog open={openPersonal} onClose={() => setOpenPersonal(false)} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmitPersonal}>
          <DialogTitle sx={{ pb: 2, fontSize: '1.25rem', fontWeight: 600 }}>
            {activePersonal ? 'Editar Personal' : 'Registrar Personal'}
          </DialogTitle>
          <DialogContent dividers sx={{ bgcolor: 'background.default', p: { xs: 2, md: 3 } }}>

            {!activePersonal && (
              <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 2, p: 3, mb: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 0.5 }}>Datos de Usuario</Typography>
                  <Typography variant="body2" color="text.secondary">Credenciales de acceso al sistema</Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}><TextField name="username" fullWidth label="Username" required size="small" /></Grid>
                  <Grid item xs={12} sm={4}><TextField name="email" fullWidth label="Email" type="email" required size="small" /></Grid>
                  <Grid item xs={12} sm={4}><TextField name="password" fullWidth label="Password" type="password" required size="small" /></Grid>
                </Grid>
              </Paper>
            )}

            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 2, p: 3, mb: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 0.5 }}>Datos Personales</Typography>
                <Typography variant="body2" color="text.secondary">Información básica del personal</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField name="nombre" defaultValue={activePersonal?.nombre} fullWidth label="Nombres" required size="small" /></Grid>
                <Grid item xs={12} sm={6}><TextField name="apellido" defaultValue={activePersonal?.apellido} fullWidth label="Apellidos" required size="small" /></Grid>
                <Grid item xs={12} sm={4}><TextField name="ci" defaultValue={activePersonal?.ci} fullWidth label="C.I." required size="small" /></Grid>
                <Grid item xs={12} sm={4}>
                  <TextField name="expedicion" defaultValue={activePersonal?.expedicion || 'LP'} fullWidth select label="Expedición" size="small">
                    {EXPEDICION_CHOICES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}><TextField name="celular" defaultValue={activePersonal?.celular} fullWidth label="Celular" required size="small" /></Grid>
              </Grid>
            </Paper>

            <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', borderRadius: 2, p: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem', mb: 0.5 }}>Datos Institucionales</Typography>
                <Typography variant="body2" color="text.secondary">Cargo y ubicación</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField name="cargo" defaultValue={activePersonal?.cargo || 'SECRETARIA'} fullWidth select label="Cargo" required size="small">
                    {CARGO_CHOICES.map((option) => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}><TextField name="direccion" defaultValue={activePersonal?.direccion} fullWidth label="Dirección" required size="small" /></Grid>
              </Grid>
            </Paper>

          </DialogContent>
          <DialogActions sx={{ p: 2, px: 3, bgcolor: 'background.paper' }}>
            <Button onClick={() => setOpenPersonal(false)} color="secondary" variant="outlined">Cancelar</Button>
            <Button type="submit" variant="contained" sx={{ px: 4 }}>
              {activePersonal ? 'Actualizar Personal' : 'Guardar Personal'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

    </MainCard>
  );
};

export default PerfilesPage;
