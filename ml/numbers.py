import tensorflow as tf

# Import some samples of handwritten numbers
# these come from the MNIST dataset
from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets('MNIST_data/', one_hot=True)

# Learning model - define the input structure, weight and biases
# the model is y = wx + b
# input images are 28 x 28 pixels
x = tf.placeholder(tf.float32, [None, 28*28])
weights = tf.Variable(tf.zeros([28*28, 10]))
bias = tf.Variable(tf.zeros([10]))
y = tf.nn.softmax(tf.matmul(x, weights) + bias)

# Measure how far the model output is from the labeled correct answer
# this is called cross-entropy
y_ = tf.placeholder(tf.float32, [None, 10])
cross_entropy = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(labels=y_, logits=y))

# Train the model by making adjustments that try to
# minimise the cross-entropy
train_step = tf.train.GradientDescentOptimizer(0.5).minimize(cross_entropy)
sess = tf.InteractiveSession()
tf.global_variables_initializer().run()

# Run iterations over the model using a new image each time
# and making adjustments based on knowing what the result should be
for _ in xrange(1000):
    batch_xs, batch_ys = mnist.train.next_batch(100)
    sess.run(train_step, feed_dict={x: batch_xs, y_: batch_ys})

# Evaluate the model by inputting data from and looking at
# how accurate the predictions are
correct_prediction = tf.equal(tf.argmax(y, 1), tf.argmax(y_, 1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
result = sess.run(accuracy, feed_dict={x: mnist.test.images, y_: mnist.test.labels})

# Print the accuracy
print('Simple model accuracy on test data:', result)
