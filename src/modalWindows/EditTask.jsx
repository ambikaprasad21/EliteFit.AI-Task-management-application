import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import Select from "react-select";
import Row from "../Ui/Row";
import Button from "../Ui/Button";
import styles from "./CreateTask.module.css";
import { useUser } from "../context/UserContext";

const Error = styled.span`
  font-size: 1rem;
  padding: 0 5px;
  color: #d71e1e;
`;

const Input = styled.input`
  outline-offset: 5px;
  outline-color: var(--primary-color);
  border: none;
  background-color: #e6f3dd;
  padding: 5px 5px;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  outline-offset: 5px;
  outline-color: var(--primary-color);
  border: none;
  background-color: #e6f3dd;
  padding: 5px 5px;
  border-radius: 5px;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 500;
`;
function EditTask({ data, onCloseModal }) {
  const task = {
    ...data,
    deadline: data.deadline
      ? new Date(data.deadline).toISOString().split("T")[0]
      : "",
    priority: { value: data.priority.value, label: data.priority.value },
  };
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: task,
  });

  const { editTask } = useUser();

  function onSubmit(newData) {
    console.log(newData);
    editTask(newData.id, newData);
    onCloseModal();
  }

  const priorityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#73bc44" : "#ccc",
      boxShadow: state.isFocused ? "0 0 0 1px #73bc44" : "none",
      "&:hover": {
        borderColor: "#73bc44",
      },
    }),
  };

  return (
    <div className={styles.new_task}>
      <p className={styles.n_t_h}>Edit task</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            {...register("title", {
              required: "This field is required.",
              max: {
                value: 30,
                message: "Title must be of 30 characters long",
              },
            })}
            placeholder="Task title"
          />
          {errors?.title?.message && <Error>{errors.title.message}</Error>}
        </Row>
        <Row>
          <Label htmlFor="description">Description</Label>
          <TextArea
            type="text"
            id="description"
            {...register("description", {
              required: "This field is required.",
            })}
            placeholder="Task description"
          />
          {errors?.description?.message && (
            <Error>{errors.description.message}</Error>
          )}
        </Row>
        <Row>
          <Label htmlFor="taskDeadline">Deadline</Label>
          <Input
            type="date"
            id="deadline"
            {...register("deadline", { required: "This field is required." })}
            placeholder="YYYY-MM-DD"
          />
          {errors.deadline && <Error>{errors.deadline.message}</Error>}
        </Row>
        <div>
          <Label htmlFor="taskPriority">Priority</Label>
          <Controller
            name="priority"
            control={control}
            rules={{ required: "Task must have a priority" }}
            render={({ field }) => (
              <Select
                options={priorityOptions}
                value={field.value}
                onChange={(selectedOptions) => field.onChange(selectedOptions)}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                styles={customStyles}
              />
            )}
          />
          {errors.priority && <Error>{errors.priority.message}</Error>}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
            marginTop: "2rem",
          }}
        >
          <Button
            variation="primary"
            size="medium"
            type="reset"
            onClick={() => onCloseModal()}
          >
            Cancel
          </Button>
          <Button variation="secondary" size="medium">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditTask;
