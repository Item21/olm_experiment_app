import React from "react";
import {
  useGetDeviceByIdQuery,
  useGetSoftwareQuery,
  useGetDeviceTypesQuery,
  useUpdateDeviceMutation,
  UpdateDevice,
} from "generated/graphql";
import Page404 from "views/pages/Page404";
import { useParams } from "react-router";
import DeviceDetail from "./DeviceDetail";

interface Props {}

const DeviceDetailWrapper = (props: Props) => {
  const param = useParams();

  const { data, loading, error } = useGetDeviceByIdQuery({
    variables: {
      input: param.id as string,
    },
  });

  const [mutation] = useUpdateDeviceMutation();
  const handleSubmit = (values: UpdateDevice) => {
    mutation({
      variables: {
        input: values,
      },
    });
  };

  const { data: softwareData } = useGetSoftwareQuery();
  const { data: deviceTypeData } = useGetDeviceTypesQuery();

  if (error || loading || !data || !softwareData || !deviceTypeData)
    return <Page404 />;

  return (
    <DeviceDetail
      handleSubmit={handleSubmit}
      device={data.getDevice}
      software={softwareData.software!.data}
      deviceTypes={deviceTypeData.device_types!.data}
    />
  );
};

export default DeviceDetailWrapper;
