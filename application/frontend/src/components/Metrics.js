import {
  Alert,
  AlertDescription,
  AlertIcon,
  Card,
  CardBody,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  ListItem,
  OrderedList,
  Radio,
  Stack,
  Text,
  VStack,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import Container from "./Container";
import { Tooltip } from "@chakra-ui/react";
import { FaQuestionCircle } from "react-icons/fa";

function Metrics({
  state,
  setState,
  handleChangeCheckbox,
  handleChangeRadio,
  handleChangeText,
  errors,
}) {
  const handleChangeMetrics = (e) => {
    const state_copy = { ...state };
    const value = e.target.value;
    if (e.target.checked) {
      state_copy[value] = value;
      if (value === "statistical_mean") {
        state_copy["agg_metric"] = "mean";
      } else if (value === "harmonic_mean") {
        state_copy["agg_metric"] = "hmean";
      } else {
        state_copy["agg_metric"] = value;
      }
    } else {
      delete state_copy[e.target.value];
      if (
        value === state_copy["agg_metric"] ||
        (value === "statistical_mean" && state_copy["agg_metric"] === "mean") ||
        (value === "harmonic_mean" && state_copy["agg_metric"] === "hmean")
      ) {
        delete state_copy["agg_metric"];
      }
    }
    setState(state_copy);
  };
  return (
    <>
      <Container title='Metrics'>
        <Stack
          spacing='5'
          align='center'
          w='full'
          p='0 20px'
          //direction={{ base: "column", lg: "row" }}
        >
          <Card w='full'>
            <CardBody>
              <FormControl
                isDisabled={state.ml__task !== "classification"}
                isInvalid={
                  state.ml__task === "classification" && errors.class_metrics
                }>
                <FormLabel>Classification Metrics</FormLabel>
                {state.ml__task === "classification" && errors.class_metrics ? (
                  <Alert status='error'>
                    <AlertIcon />
                    <AlertDescription>
                      Select at least one metric
                    </AlertDescription>
                  </Alert>
                ) : (
                  ""
                )}
                <VStack align='flex-start'>
                  <Checkbox
                    value='accuracy'
                    onChange={handleChangeCheckbox}
                    isChecked={state.accuracy !== undefined}>
                    Accuracy
                  </Checkbox>
                  {state.accuracy !== undefined ? (
                    <HStack>
                      <FormLabel>Weight:</FormLabel>
                      <Input
                        name='weight_acc'
                        onChange={handleChangeText}
                        value={state.weight_acc}
                        defaultValue={state.weight_acc}
                      />
                    </HStack>
                  ) : (
                    ""
                  )}
                  <Checkbox
                    value='precision'
                    onChange={handleChangeCheckbox}
                    isChecked={state.precision !== undefined}>
                    Precision
                  </Checkbox>
                  {state.precision !== undefined ? (
                    <HStack>
                      <FormLabel>Weight:</FormLabel>
                      <Input
                        name='weight_precision'
                        onChange={handleChangeText}
                        value={state.weight_precision}
                        required
                      />
                    </HStack>
                  ) : (
                    ""
                  )}
                  <Checkbox
                    value='recall'
                    onChange={handleChangeCheckbox}
                    isChecked={state.recall !== undefined}>
                    Recall
                  </Checkbox>
                  {state.recall !== undefined ? (
                    <HStack>
                      <FormLabel>Weight:</FormLabel>
                      <Input
                        name='weight_recall'
                        onChange={handleChangeText}
                        value={state.weight_recall}
                        required
                      />
                    </HStack>
                  ) : (
                    ""
                  )}
                  <Checkbox
                    value='f1_score'
                    onChange={handleChangeCheckbox}
                    isChecked={state.f1_score !== undefined}>
                    F1Score
                  </Checkbox>
                  {state.f1_score !== undefined ? (
                    <HStack>
                      <FormLabel>Weight:</FormLabel>
                      <Input
                        name='weight_f1score'
                        onChange={handleChangeText}
                        value={state.weight_f1_score}
                        required
                      />
                    </HStack>
                  ) : (
                    ""
                  )}
                  <Checkbox
                    value='auc'
                    onChange={handleChangeCheckbox}
                    isChecked={state.auc !== undefined}
                    isDisabled={state.label === "multiclass"}>
                    Area Under Curve
                  </Checkbox>
                  {state.label === "multiclass" ? (
                    <FormHelperText color='darkorange'>
                      Not compatible with Multi Class label
                    </FormHelperText>
                  ) : (
                    ""
                  )}
                  {state.auc !== undefined ? (
                    <HStack>
                      <FormLabel>Weight:</FormLabel>
                      <Input
                        name='weight_auc'
                        onChange={handleChangeText}
                        value={state.weight_auc}
                        required
                      />
                    </HStack>
                  ) : (
                    ""
                  )}
                  <Checkbox
                    value='zero_one_loss'
                    onChange={handleChangeCheckbox}
                    isChecked={state.zero_one_loss !== undefined}>
                    Zero One Loss
                  </Checkbox>
                  {state.zero_one_loss !== undefined ? (
                    <HStack>
                      <FormLabel>Weight:</FormLabel>
                      <Input
                        name='weight_zero_one_loss'
                        onChange={handleChangeText}
                        value={state.weight_zero_one_loss}
                        required
                      />
                    </HStack>
                  ) : (
                    ""
                  )}
                  <Checkbox
                    value='mcc'
                    onChange={handleChangeCheckbox}
                    isChecked={state.mcc !== undefined}>
                    Matthews Correlation Coefficient
                  </Checkbox>
                  {state.mcc !== undefined ? (
                    <HStack>
                      <FormLabel>Weight:</FormLabel>
                      <Input
                        name='weight_mcc'
                        onChange={handleChangeText}
                        value={state.weight_mcc}
                        required
                      />
                    </HStack>
                  ) : (
                    ""
                  )}
                  <Checkbox
                    value='class_likelihood'
                    onChange={handleChangeCheckbox}
                    isChecked={state.class_likelihood !== undefined}>
                    Class Likelihood
                  </Checkbox>
                  {state.class_likelihood !== undefined ? (
                    <HStack>
                      <FormLabel>Weight:</FormLabel>
                      <Input
                        name='weight_class_likelihood'
                        onChange={handleChangeText}
                        value={state.weight_class_likelihood}
                        required
                      />
                    </HStack>
                  ) : (
                    ""
                  )}
                  <Checkbox
                    value='hamming_loss'
                    onChange={handleChangeCheckbox}
                    isChecked={state.hamming_loss !== undefined}>
                    Hamming Loss
                  </Checkbox>
                  {state.hamming_loss !== undefined ? (
                    <HStack>
                      <FormLabel>Weight:</FormLabel>
                      <Input
                        name='weight_hamming_loss'
                        onChange={handleChangeText}
                        value={state.weight_hamming_loss}
                        required
                      />
                    </HStack>
                  ) : (
                    ""
                  )}
                  <Checkbox
                    value='jaccard_score'
                    onChange={handleChangeCheckbox}
                    isChecked={state.jaccard_score !== undefined}>
                    Jaccard Score
                  </Checkbox>
                  {state.jaccard_score !== undefined ? (
                    <HStack>
                      <FormLabel>Weight:</FormLabel>
                      <Input
                        name='weight_jaccard_score'
                        onChange={handleChangeText}
                        value={state.weight_jaccard_score}
                        required
                      />
                    </HStack>
                  ) : (
                    ""
                  )}
                  <Checkbox
                    value='log_loss'
                    onChange={handleChangeCheckbox}
                    isChecked={state.log_loss !== undefined}>
                    Log Loss
                  </Checkbox>
                  {state.log_loss !== undefined ? (
                    <HStack>
                      <FormLabel>Weight:</FormLabel>
                      <Input
                        name='weight_log_loss'
                        onChange={handleChangeText}
                        value={state.weight_log_loss}
                        required
                      />
                    </HStack>
                  ) : (
                    ""
                  )}
                </VStack>
              </FormControl>
            </CardBody>
          </Card>
          <Card w='full'>
            <CardBody>
              <FormControl
                isDisabled={state.ml__task !== "regression"}
                isInvalid={
                  state.ml__task === "regression" && errors.class_metrics
                }>
                <FormLabel>Regression Metrics</FormLabel>
                {state.ml__task === "regression" && errors.class_metrics ? (
                  <Alert status='error'>
                    <AlertIcon />
                    <AlertDescription>
                      Select at least one metric
                    </AlertDescription>
                  </Alert>
                ) : (
                  ""
                )}
                <VStack align='flex-start'>
                  <Checkbox
                    value='mean_squared_error'
                    onChange={handleChangeCheckbox}
                    isChecked={state.mean_squared_error !== undefined}>
                    Mean Squared Error
                  </Checkbox>
                  <Checkbox
                    value='mean_absolute_error'
                    onChange={handleChangeCheckbox}
                    isChecked={state.mean_absolute_error !== undefined}>
                    Mean Absolute Error
                  </Checkbox>
                  <Checkbox
                    value='r2_error'
                    onChange={handleChangeCheckbox}
                    isChecked={state.r2_error !== undefined}>
                    R2 Error
                  </Checkbox>
                  <Checkbox
                    value='mean_squared_logaritmic_error'
                    onChange={handleChangeCheckbox}
                    isChecked={
                      state.mean_squared_logaritmic_error !== undefined
                    }>
                    Mean Squared Logaritmic Error
                  </Checkbox>
                  <Checkbox
                    value='mean_absolute_percentage_error'
                    onChange={handleChangeCheckbox}
                    isChecked={
                      state.mean_absolute_percentage_error !== undefined
                    }>
                    Mean Absolute Percentage Error
                  </Checkbox>
                </VStack>
              </FormControl>
            </CardBody>
          </Card>
          {state.fairness !== undefined ? (
            <Card w='full'>
              <CardBody>
                <FormControl
                  isDisabled={state.fairness === undefined}
                  isInvalid={errors.fair_metric_err}>
                  <FormLabel>Fairness Metrics</FormLabel>
                  {errors.fair_metric_err ? (
                    <Alert status='error'>
                      <AlertIcon />
                      <AlertDescription>
                        Select at least one metric
                      </AlertDescription>
                    </Alert>
                  ) : (
                    ""
                  )}
                  <VStack align='flex-start' pl='4' spacing='20px'>
                    <OrderedList mt='2'>
                      <ListItem>
                        <Text>
                          Are you dealing with bias on{" "}
                          <Text as='b'>individuals</Text> (similar individuals
                          should be treated similarly) ,{" "}
                          <Text as='b'>groups</Text> (individuals of a group
                          should not be discriminated)?
                        </Text>
                      </ListItem>
                      <VStack align='flex-start'>
                        <Checkbox
                          name='individual'
                          value='individual'
                          onChange={handleChangeCheckbox}
                          isChecked={state.individual !== undefined}
                          isDisabled={state.fairness === undefined}
                          mt='2'>
                          Individual
                        </Checkbox>
                        {state.individual === "individual" ? (
                          <VStack pl='4' align='flex-start' spacing='2'>
                            <FormControl>
                              <HStack>
                                <Checkbox
                                  value='euclidean_distance'
                                  onChange={handleChangeCheckbox}
                                  isChecked={
                                    state.euclidean_distance !== undefined
                                  }>
                                  Euclidean Distance
                                </Checkbox>
                                <Tooltip label='Euclidean Distance measures the straight line distance between two points (0 means fairness)'>
                                  <span>
                                    <Icon as={FaQuestionCircle} ml={2} />
                                  </span>
                                </Tooltip>
                              </HStack>
                              {state.euclidean_distance !== undefined ? (
                                <HStack>
                                  <FormLabel>Weight:</FormLabel>
                                  <Input
                                    name='weight_euclidean_distance'
                                    onChange={handleChangeText}
                                    value={state.weight_euclidean_distance}
                                    defaultValue={
                                      state.weight_euclidean_distance
                                    }
                                  />
                                </HStack>
                              ) : (
                                ""
                              )}
                              <HStack>
                                <Checkbox
                                  value='manhattan_distance'
                                  onChange={handleChangeCheckbox}
                                  isChecked={
                                    state.manhattan_distance !== undefined
                                  }>
                                  Manhattan Distance
                                </Checkbox>
                                <Tooltip label='Manhattan Distance measures the sum of absolute differences between coordinates (0 means fairness)'>
                                  <span>
                                    <Icon as={FaQuestionCircle} ml={2} />
                                  </span>
                                </Tooltip>
                              </HStack>
                              {state.manhattan_distance !== undefined ? (
                                <HStack>
                                  <FormLabel>Weight:</FormLabel>
                                  <Input
                                    name='weight_manhattan_distance'
                                    onChange={handleChangeText}
                                    value={state.weight_manhattan_distance}
                                    defaultValue={
                                      state.weight_manhattan_distance
                                    }
                                  />
                                </HStack>
                              ) : (
                                ""
                              )}
                              <HStack>
                                <Checkbox
                                  value='mahalanobis_distance'
                                  onChange={handleChangeCheckbox}
                                  isChecked={
                                    state.mahalanobis_distance !== undefined
                                  }>
                                  Mahalanobis Distance
                                </Checkbox>
                                <Tooltip label='Mahalanobis Distance measures the distance between a point and a distribution (0 means fairness)'>
                                  <span>
                                    <Icon as={FaQuestionCircle} ml={2} />
                                  </span>
                                </Tooltip>
                              </HStack>
                              {state.mahalanobis_distance !== undefined ? (
                                <HStack>
                                  <FormLabel>Weight:</FormLabel>
                                  <Input
                                    name='weight_mahalanobis_distance'
                                    onChange={handleChangeText}
                                    value={state.weight_mahalanobis_distance}
                                    defaultValue={
                                      state.weight_mahalanobis_distance
                                    }
                                  />
                                </HStack>
                              ) : (
                                ""
                              )}
                            </FormControl>
                          </VStack>
                        ) : (
                          ""
                        )}
                        <Checkbox
                          name='group_metric'
                          value='group_metric'
                          onChange={handleChangeCheckbox}
                          isChecked={state.group_metric !== undefined}
                          isDisabled={state.fairness === undefined}
                          mt='2'>
                          Group
                        </Checkbox>
                        {state.group_metric === "group_metric" ? (
                          <Stack pl='4'>
                            <ListItem>
                              <Text>
                                Should different groups be treated{" "}
                                <Text as='b'>equally</Text> (everyone should
                                have the same probability of receiving a
                                positive label),{" "}
                                <Text as='b'>proportionally</Text> (everyone
                                should get a positive label only if the evidence
                                tells that), or <Text as='b'>other</Text>?
                              </Text>
                            </ListItem>
                            <VStack align='flex-start'>
                              <Checkbox
                                name='equal'
                                value='equal'
                                onChange={handleChangeCheckbox}
                                isChecked={state.equal === "equal"}
                                isDisabled={state.fairness === undefined}
                                mt='2'>
                                Equally
                              </Checkbox>
                              {state.equal === "equal" ? (
                                <VStack pl='4' align='flex-start'>
                                  <HStack>
                                    <Checkbox
                                      value='statistical_parity'
                                      onChange={handleChangeCheckbox}
                                      isChecked={
                                        state.statistical_parity !== undefined
                                      }>
                                      Statistical Parity
                                      <Tooltip label='Statistical Parity measures the difference in positive outcome rates between groups (0 means fairness)'>
                                        <span>
                                          <Icon as={FaQuestionCircle} ml={2} />
                                        </span>
                                      </Tooltip>
                                    </Checkbox>
                                  </HStack>
                                  {state.statistical_parity !== undefined ? (
                                    <HStack>
                                      <FormLabel>Weight:</FormLabel>
                                      <Input
                                        name='weight_stat_par'
                                        onChange={handleChangeText}
                                        value={state.weight_stat_par}
                                        defaultValue={state.weight_stat_par}
                                      />
                                    </HStack>
                                  ) : (
                                    ""
                                  )}
                                  <HStack>
                                    <Checkbox
                                      value='disparate_impact'
                                      onChange={handleChangeCheckbox}
                                      isChecked={
                                        state.disparate_impact !== undefined
                                      }>
                                      Disparate Impact
                                      <Tooltip label='Disparate Impact measures the ratio of positive outcome rates between groups (1 means fairness)'>
                                        <span>
                                          <Icon as={FaQuestionCircle} ml={2} />
                                        </span>
                                      </Tooltip>
                                    </Checkbox>
                                  </HStack>
                                  {state.disparate_impact !== undefined ? (
                                    <HStack>
                                      <FormLabel>Weight:</FormLabel>
                                      <Input
                                        name='weight_disp_imp'
                                        onChange={handleChangeText}
                                        value={state.weight_disp_imp}
                                        defaultValue={state.weight_disp_imp}
                                        isRequired
                                      />
                                    </HStack>
                                  ) : (
                                    ""
                                  )}
                                </VStack>
                              ) : (
                                ""
                              )}
                              <Checkbox
                                name='proportional'
                                value='proportional'
                                onChange={handleChangeCheckbox}
                                isChecked={
                                  state.proportional === "proportional"
                                }
                                isDisabled={state.fairness === undefined}
                                mt='2'>
                                Proportionally
                              </Checkbox>
                              {state.proportional === "proportional" ? (
                                <VStack pl='4' align='flex-start'>
                                  <HStack>
                                    <Checkbox
                                      value='equalized_odds'
                                      onChange={handleChangeCheckbox}
                                      isChecked={
                                        state.equalized_odds !== undefined
                                      }>
                                      Equalized Odds Difference
                                    </Checkbox>
                                    <Tooltip label='Equalized Odds Difference measures the difference in true positive rates between groups (0 means fairness)'>
                                      <span>
                                        <Icon as={FaQuestionCircle} ml={2} />
                                      </span>
                                    </Tooltip>
                                  </HStack>
                                  {state.equalized_odds !== undefined ? (
                                    <HStack>
                                      <FormLabel>Weight:</FormLabel>
                                      <Input
                                        name='weight_eq_odds'
                                        onChange={handleChangeText}
                                        value={state.weight_eq_odds}
                                        defaultValue={state.weight_eq_odds}
                                        isRequired
                                      />
                                    </HStack>
                                  ) : (
                                    ""
                                  )}
                                  <HStack>
                                    <Checkbox
                                      value='average_odds'
                                      onChange={handleChangeCheckbox}
                                      isChecked={
                                        state.average_odds !== undefined
                                      }>
                                      Average Odds Difference
                                    </Checkbox>
                                    <Tooltip label='Average Odds Difference measures the difference in true and false positive rates between groups (0 means fairness)'>
                                      <span>
                                        <Icon as={FaQuestionCircle} ml={2} />
                                      </span>
                                    </Tooltip>
                                  </HStack>
                                  {state.average_odds !== undefined ? (
                                    <HStack>
                                      <FormLabel>Weight:</FormLabel>
                                      <Input
                                        name='weight_ao'
                                        onChange={handleChangeText}
                                        value={state.weight_ao}
                                        defaultValue={state.weight_ao}
                                        isRequired
                                      />
                                    </HStack>
                                  ) : (
                                    ""
                                  )}
                                </VStack>
                              ) : (
                                ""
                              )}
                              <Checkbox
                                name='other'
                                value='other'
                                onChange={handleChangeCheckbox}
                                isChecked={state.other === "other"}
                                isDisabled={state.fairness === undefined}
                                mt='2'>
                                Other
                              </Checkbox>
                              {state.other === "other" ? (
                                <VStack pl='4' align='flex-start'>
                                  <HStack>
                                    <Checkbox
                                      value='true_positive_difference'
                                      onChange={handleChangeCheckbox}
                                      isChecked={
                                        state.true_positive_difference !==
                                        undefined
                                      }>
                                      Error Rate Difference
                                    </Checkbox>
                                    <Tooltip label='Error Rate Difference measures the difference in false positive and false negative rates between groups (0 means fairness)'>
                                      <span>
                                        <Icon as={FaQuestionCircle} ml={2} />
                                      </span>
                                    </Tooltip>
                                  </HStack>
                                  {state.true_positive_difference !==
                                  undefined ? (
                                    <HStack>
                                      <FormLabel>Weight:</FormLabel>
                                      <Input
                                        name='weight_tpr_diff'
                                        onChange={handleChangeText}
                                        value={state.weight_tpr_diff}
                                        defaultValue={state.weight_tpr_diff}
                                        isRequired
                                      />
                                    </HStack>
                                  ) : (
                                    ""
                                  )}
                                  <HStack>
                                    <Checkbox
                                      value='false_positive_difference'
                                      onChange={handleChangeCheckbox}
                                      isChecked={
                                        state.false_positive_difference !==
                                        undefined
                                      }>
                                      False Positive Difference
                                    </Checkbox>
                                    <Tooltip label='False Positive Difference measures the difference in false positive rates between groups (0 means fairness)'>
                                      <span>
                                        <Icon as={FaQuestionCircle} ml={2} />
                                      </span>
                                    </Tooltip>
                                  </HStack>
                                  {state.false_positive_difference !==
                                  undefined ? (
                                    <HStack>
                                      <FormLabel>Weight:</FormLabel>
                                      <Input
                                        name='weight_fpr_diff'
                                        onChange={handleChangeText}
                                        value={state.weight_fpr_diff}
                                        defaultValue={state.weight_fpr_diff}
                                        isRequired
                                      />
                                    </HStack>
                                  ) : (
                                    ""
                                  )}
                                </VStack>
                              ) : (
                                ""
                              )}
                            </VStack>
                          </Stack>
                        ) : (
                          ""
                        )}
                      </VStack>
                    </OrderedList>
                  </VStack>
                </FormControl>
              </CardBody>
            </Card>
          ) : (
            ""
          )}
        </Stack>
      </Container>
      <Container title='Tradeoff Strategy'>
        <Stack spacing='5' align='center' w='full' p='0 20px'>
          <FormControl isInvalid={errors.trade_off_error}>
            <VStack align='flex-start' w='full' h='full'>
              {errors.trade_off_error ? (
                <Alert status='error'>
                  <AlertIcon />
                  <AlertDescription>
                    Select one trade-off strategy
                  </AlertDescription>
                </Alert>
              ) : (
                ""
              )}
              <Checkbox
                value='agg_func'
                onChange={handleChangeCheckbox}
                isChecked={state.agg_func !== undefined}
                isDisabled={state.pareto_front !== undefined}>
                Aggregation Function
              </Checkbox>
              {state.agg_func !== undefined ? (
                <FormControl isInvalid={errors.aggr_metrics}>
                  <Stack pl='6'>
                    {errors.aggr_metrics ? (
                      <Alert status='error'>
                        <AlertIcon />
                        <AlertDescription>
                          Select at least one aggregation function
                        </AlertDescription>
                      </Alert>
                    ) : (
                      ""
                    )}

                    <Checkbox
                      value='min'
                      onChange={handleChangeMetrics}
                      isChecked={state.min !== undefined}>
                      Minimum
                    </Checkbox>
                    <Radio
                      name='agg_metric'
                      value='min'
                      onChange={handleChangeRadio}
                      isChecked={state.agg_metric === "min"}
                      isDisabled={state.min === undefined}
                      pl={6}>
                      Select best solution with this function
                    </Radio>
                    <Checkbox
                      value='max'
                      onChange={handleChangeMetrics}
                      isChecked={state.max !== undefined}>
                      Maximum
                    </Checkbox>
                    <Radio
                      name='agg_metric'
                      value='max'
                      onChange={handleChangeRadio}
                      isDisabled={state.max === undefined}
                      isChecked={state.agg_metric === "max"}
                      pl='6'>
                      Select best solution with this function
                    </Radio>
                    <Checkbox
                      value='statistical_mean'
                      onChange={handleChangeMetrics}
                      isChecked={state.statistical_mean !== undefined}>
                      Statistical Mean
                    </Checkbox>
                    <Radio
                      name='agg_metric'
                      value='mean'
                      onChange={handleChangeRadio}
                      isChecked={state.agg_metric === "mean"}
                      isDisabled={state.statistical_mean === undefined}
                      pl='6'>
                      Select best solution with this function
                    </Radio>
                    <Checkbox
                      value='harmonic_mean'
                      onChange={handleChangeMetrics}
                      isChecked={state.harmonic_mean !== undefined}>
                      Harmonic Mean
                    </Checkbox>
                    <Radio
                      name='agg_metric'
                      value='hmean'
                      onChange={handleChangeRadio}
                      isChecked={state.agg_metric === "hmean"}
                      isDisabled={state.harmonic_mean === undefined}
                      pl='6'>
                      Select best solution with this function
                    </Radio>
                    <Checkbox
                      value='weighted_mean'
                      onChange={handleChangeMetrics}
                      isChecked={state.weighted_mean !== undefined}>
                      Weighted Mean
                    </Checkbox>
                    <Radio
                      name='agg_metric'
                      value='weighted_mean'
                      onChange={handleChangeRadio}
                      isChecked={state.agg_metric === "weighted_mean"}
                      isDisabled={state.harmonic_mean === undefined}
                      pl='6'>
                      Select best solution with this function
                    </Radio>
                  </Stack>
                </FormControl>
              ) : (
                ""
              )}
              <Checkbox
                value='pareto_front'
                onChange={handleChangeCheckbox}
                isChecked={state.pareto_front !== undefined}
                isDisabled={state.agg_func !== undefined}>
                Pareto Front
              </Checkbox>
            </VStack>
          </FormControl>
        </Stack>
      </Container>
    </>
  );
}

export default Metrics;
